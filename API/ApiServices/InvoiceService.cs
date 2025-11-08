using API.Extensions;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;

namespace API.ApiServices;

public class InvoiceService : BaseService, IInvoiceService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;


    public InvoiceService(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApiResponse> CreateInvoice(CreateInvoiceDto createInvoiceDto)
    {
        var patient = await _unitOfWork.Repository<PatientUser>().GetByIdAsync(createInvoiceDto.PatientId);

        if (patient is null) return Response(false, 400, "Patient not found", null);

        var invoice = new Invoice
        {
            InvoiceDate = DateTime.UtcNow,
            PatientId = createInvoiceDto.PatientId,
        };

        foreach (var details in createInvoiceDto.InvoiceDetails)
        {
            var medicine = await _unitOfWork.Repository<Medicine>().GetByIdAsync(details.MedicineId);

            if (medicine is null) return Response(false, 400, "Medicine not found", null);

            if (medicine.Stock < details.Quantity)
                return Response(false, 400, $"Insufficient quantity for this medicine: {medicine.Name}");

            medicine.Stock -= details.Quantity;

            var invoiceDetail = new InvoiceDetail
            {
                MedicineId = details.MedicineId,
                Quantity = details.Quantity,
                TotalPrice = details.Quantity * medicine.Price
            };

            invoice.InvoiceDetails.Add(invoiceDetail);
        }

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 201, null, null)
            : Response(false, 400, "This invoice failed to create");
    }

    public async Task<ApiResponse> GetInvoices(InvoiceSpecParams invoiceSpecParams)
    {
        var spec = InvoiceSpecification.GetAllInvoices(invoiceSpecParams);

        var data = await CreatePagedResult<Invoice, InvoiceDto>(_unitOfWork.Repository<Invoice>(), spec,
            invoiceSpecParams.PageIndex, invoiceSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }

    public async Task<ApiResponse> GetInvoicesByPatient(int patientId, InvoiceSpecParams invoiceParams)
    {
        var spec = InvoiceSpecification.GetInvoicesByPatient(patientId, invoiceParams);

        var data = await CreatePagedResult<Invoice, InvoiceDto>(_unitOfWork.Repository<Invoice>(), spec,
            invoiceParams.PageIndex, invoiceParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }
}