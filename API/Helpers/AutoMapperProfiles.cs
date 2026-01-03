using AutoMapper;
using Core.DTOs;
using Core.Entities;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<RegisterDto, AppUser>();

        CreateMap<RegisterDto, AppUser>();
        CreateMap<LoginDto, AppUser>();

        CreateMap<PatientUser, PatientDto>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.AppUser.UserName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.AppUser.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.AppUser.PhoneNumber))
            .ForMember(dest => dest.Invoices, opt => opt.MapFrom(src => src.Invoices));

        CreateMap<DoctorUser, DoctorDto>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.AppUser.UserName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.AppUser.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.AppUser.PhoneNumber));

        CreateMap<DeliveryUser, DeliveryWorkerDto>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.AppUser.UserName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.AppUser.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.AppUser.PhoneNumber));
    
        CreateMap<Invoice, InvoiceDto>();
        CreateMap<SupplierUser, SupplierDto>();
        CreateMap<Medicine, MedicineDto>();
        CreateMap<Purchase, PurchaseDto>();
        CreateMap<CreatePatientDto, AppUser>();
        CreateMap<CreatePatientDto, PatientUser>();
        CreateMap<UpdatePatientDto, AppUser>();

        CreateMap<CreateDoctorDto, AppUser>();
        CreateMap<CreateDoctorDto, PatientUser>();
        CreateMap<UpdateDoctorDto, AppUser>();

        CreateMap<CreateDeliveryWorkerDto, AppUser>();
        CreateMap<CreateDeliveryWorkerDto, DeliveryUser>();
        CreateMap<UpdateDeliveryWorkerDto, AppUser>();


        CreateMap<CreateCompanyDto, InsuranceCompany>();
        CreateMap<InsuranceCompany, CompanyDto>();
        CreateMap<UpdateCompanyDto, InsuranceCompany>();


        CreateMap<CreateCardDto, InsuranceCard>();
        CreateMap<InsuranceCard, CardDto>();


        CreateMap<Delivery, DeliveryDto>()
            .ForMember(x => x.DeliveryId, opt => opt.MapFrom(src => src.Id));

        
        CreateMap<AppUserDto, AppUser>();

        CreateMap<PatientUser, AppUserDto>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.AppUser.UserName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.AppUser.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.AppUser.PhoneNumber));

        CreateMap<PatientUser, PatientUserDto>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.AppUser.UserName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.AppUser.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.AppUser.PhoneNumber));
        
        CreateMap<CreateSupplierDto, AppUser>();
        CreateMap<UpdateSupplierDto, AppUser>();
        CreateMap<SupplierUser, SupplierDto>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.AppUser.UserName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.AppUser.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.AppUser.PhoneNumber))
            .ForMember(dest => dest.Medicines, opt => opt.MapFrom(src => src.Medicines))
            .ForMember(dest => dest.Purchases, opt => opt.MapFrom(src => src.Purchases));


        CreateMap<SupplierUser, SupplierUserDto>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.AppUser.UserName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.AppUser.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.AppUser.PhoneNumber));
        


        CreateMap<CreateMedicineDto, Medicine>();
        CreateMap<CreateMedicineDto, MedicineDto>();
        CreateMap<Medicine, MedicineDto>()
            .ForMember(dest => dest.SupplierName, opt => opt.MapFrom(src => src.Supplier!.AppUser.UserName));
        CreateMap<MedicineDto, Medicine>();
        CreateMap<UpdateMedicineDto, Medicine>();   

        CreateMap<Purchase, PurchaseDto>()
            .ForMember(x => x.MedicineName, opt => opt.MapFrom(src => src.Medicine.Name))
            .ForMember(x => x.SupplierName, opt => opt.MapFrom(src => src.Supplier.AppUser.UserName)); 


        CreateMap<CreatePurchaseDto, Purchase>();

        CreateMap<InvoiceDetail, InvoiceDetailDto>()
            .ForMember(dest => dest.MedicineName, opt => opt.MapFrom(src => src.Medicine.Name))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.TotalPrice));

        CreateMap<Invoice, InvoiceDto>()
            .ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.Patient.AppUser.UserName))
            .ForMember(dest => dest.InvoiceDetails, opt => opt.MapFrom(src => src.InvoiceDetails))
            .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => src.InvoiceDetails.Sum(x => x.TotalPrice)));

        CreateMap<Order, OrderDto>()
            .ForMember(dest => dest.PatientId, opt => opt.MapFrom(src => src.PatientId))
            .ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.Patient.AppUser.UserName))
            .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails))
            .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => src.OrderDetails.Sum(x => x.UnitPrice * x.Quantity)));

        CreateMap<OrderDetails, OrderDetailsDto>()
            .ForMember(dest => dest.MedicineName, opt => opt.MapFrom(src => src.Medicine.Name))
            .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => src.TotalPrice));
    }
}