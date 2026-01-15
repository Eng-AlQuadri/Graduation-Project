using System.Text.Json;
using API.Extensions;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.ApiServices;

public class OrderService : BaseService, IOrderService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly FileService _fileService;


    public OrderService(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, FileService fileService)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
        _fileService = fileService;
    }

    public async Task<ApiResponse> GetOrders(OrderSpecParams orderSpecParams)
    {
        var spec = OrderSpecification.GetAllOrders(orderSpecParams);

        var data = await CreatePagedResult<Order, OrderDto>(_unitOfWork.Repository<Order>(), spec,
            orderSpecParams.PageIndex, orderSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }

    public async Task<ApiResponse> CreateOrder(CreateOrderDto createOrderDto)
    {

        var fileUrl = await _fileService.SavePrescriptionAsync(createOrderDto.Prescription!);

        if (string.IsNullOrWhiteSpace(createOrderDto.OrderDetails))
            return Response(false, 400, "OrderDetails is required", null);

        List<CreateOrderDetailsDto>? orderDetails;

        try
        {
            orderDetails = JsonSerializer.Deserialize<List<CreateOrderDetailsDto>>(createOrderDto.OrderDetails);
        }
        catch
        {
            return Response(false, 400, "OrderDetails JSON format is invalid", null);
        }

        if (orderDetails == null || orderDetails.Count == 0)
            return Response(false, 400, "Order must contain at least one item", null);

        var newOrder = new Order()
        {
            Address = createOrderDto.Address,
            PrescriptionUrl = fileUrl,
            OrderDate = DateTime.UtcNow,
            PatientId = _httpContextAccessor.HttpContext!.User.GetUserId(),
            Approved = false,
            OrderDetails = new List<OrderDetails>()
        };

        foreach (var item in orderDetails)
        {
            if (item.MedicineId <= 0)
                return Response(false, 400, "Invalid MedicineId", null);

            if (item.Quantity <= 0)
                return Response(false, 400, "Quantity must be greater than zero", null);

            var med = await _unitOfWork.Repository<Medicine>().GetByIdAsync(item.MedicineId);

            if (med is null)
                return Response(false, 400, $"Medicine with ID {item.MedicineId} not found", null);

            newOrder.OrderDetails.Add(new OrderDetails
            {
                MedicineId = med.Id,
                MedicineName = med.Name,
                Quantity = item.Quantity,
                UnitPrice = med.Price
            });
        }

        _unitOfWork.Repository<Order>().Add(newOrder);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, "Order created successfully", null)
            : Response(false, 500, "Failed to save order", null);
    }

    public async Task<ApiResponse> CreateOrderByDoctor(CreateOrderDtoByDoctor createOrderDto)
    {

        var fileUrl = await _fileService.SavePrescriptionAsync(createOrderDto.Prescription!);

        if (string.IsNullOrWhiteSpace(createOrderDto.OrderDetails))
            return Response(false, 400, "OrderDetails is required", null);

        List<CreateOrderDetailsDto>? orderDetails;

        try
        {
            orderDetails = JsonSerializer.Deserialize<List<CreateOrderDetailsDto>>(createOrderDto.OrderDetails);
        }
        catch
        {
            return Response(false, 400, "OrderDetails JSON format is invalid", null);
        }

        if (orderDetails == null || orderDetails.Count == 0)
            return Response(false, 400, "Order must contain at least one item", null);

        var newOrder = new Order()
        {
            Address = createOrderDto.Address,
            PrescriptionUrl = fileUrl,
            OrderDate = DateTime.UtcNow,
            PatientId = createOrderDto.PatientId,
            DoctorId = _httpContextAccessor.HttpContext!.User.GetUserId(),
            Approved = false,
            OrderDetails = new List<OrderDetails>()
        };

        foreach (var item in orderDetails)
        {
            if (item.MedicineId <= 0)
                return Response(false, 400, "Invalid MedicineId", null);

            if (item.Quantity <= 0)
                return Response(false, 400, "Quantity must be greater than zero", null);

            var med = await _unitOfWork.Repository<Medicine>().GetByIdAsync(item.MedicineId);

            if (med is null)
                return Response(false, 400, $"Medicine with ID {item.MedicineId} not found", null);

            newOrder.OrderDetails.Add(new OrderDetails
            {
                MedicineId = med.Id,
                MedicineName = med.Name,
                Quantity = item.Quantity,
                UnitPrice = med.Price
            });
        }

        _unitOfWork.Repository<Order>().Add(newOrder);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, "Order created successfully", null)
            : Response(false, 500, "Failed to save order", null);
    }

    public async Task<ApiResponse> GetOrdersByPatient(OrderSpecParams orderSpecParams)
    {
        var currentPatientId = _httpContextAccessor.HttpContext!.User.GetUserId();

        var spec = OrderSpecification.GetAllOrdersByPatient(orderSpecParams, currentPatientId);

        var data = await CreatePagedResult<Order, OrderDto>(_unitOfWork.Repository<Order>(), spec,
            orderSpecParams.PageIndex, orderSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }

    public async Task<ApiResponse> GetOrdersByDoctor(OrderSpecParams orderSpecParams)
    {
        var currentDoctorId = _httpContextAccessor.HttpContext!.User.GetUserId();

        var spec = OrderSpecification.GetAllOrdersByDoctor(orderSpecParams, currentDoctorId);

        var data = await CreatePagedResult<Order, OrderDto>(_unitOfWork.Repository<Order>(), spec,
            orderSpecParams.PageIndex, orderSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }

    public async Task<ApiResponse> ApproveOrder(int orderId)
    {
        var orderSpec = OrderSpecification.GetOrderById(orderId);

        var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(orderSpec);

        if (order is null) return Response(false, 400, null, "Order not found");

        order.Approved = true;

        order.ApprovalTime = DateTime.UtcNow;

        // handle storage and delivery and create invoice

        var invoice = new Invoice
        {
            InvoiceDate = DateTime.UtcNow,
            PatientId = order.PatientId
        };

        foreach (var item in order.OrderDetails)
        {
            var medicine = await _unitOfWork.Repository<Medicine>().GetByIdAsync(item.MedicineId);

            if (medicine is null) return Response(false, 400, null, "Medicine not found");

            if (medicine.Stock < item.Quantity) return Response(false, 400, null, "The requested quantity is not available");

            medicine.Stock -= item.Quantity;

            var invoiceDetail = new InvoiceDetail
            {
                MedicineId = medicine.Id,
                Quantity = item.Quantity,
                TotalPrice = medicine.Price * item.Quantity
            };

            invoice.InvoiceDetails.Add(invoiceDetail);

            _unitOfWork.Repository<Medicine>().Update(medicine);
        }

        _unitOfWork.Repository<Invoice>().Add(invoice);

        var delivery = new Delivery
        {
            OrderId = order.Id,
            PatientId = order.PatientId,
            DeliveryWorkerId = await AssignToWorker(),
            CreatedAt = DateTime.UtcNow,
            Status = 0
        };

        _unitOfWork.Repository<Delivery>().Add(delivery);

        var saved = await _unitOfWork.Complete();

        return saved 
            ? Response(true, 200, null, null)
            : Response(false, 500, null, "Internal Server Error");
    }


    private async Task<int> AssignToWorker ()
    {
        var workers = await _unitOfWork.Repository<DeliveryUser>().ListAllAsync();

        if (!workers.Any()) throw new Exception("No delivery worker available");

        var totalDeliveries = await _unitOfWork.Repository<Delivery>().CountAsync();

        int index = totalDeliveries % workers.Count;

        return workers[index].Id;
    }
}