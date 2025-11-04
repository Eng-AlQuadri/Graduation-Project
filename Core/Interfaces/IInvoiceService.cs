using Core.DTOs;
using Core.Specifications;

namespace Core.Interfaces;

public interface IInvoiceService
{
    public Task<ApiResponse> GetInvoices(InvoiceSpecParams invoiceSpecParams);
    public Task<ApiResponse> GetInvoicesByPatient(int patientId, InvoiceSpecParams invoiceParams);
    public Task<ApiResponse> CreateInvoice(CreateInvoiceDto createInvoiceDto);
}