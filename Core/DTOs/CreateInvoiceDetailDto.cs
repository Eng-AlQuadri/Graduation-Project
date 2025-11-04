namespace API.DTOs
{
    public class CreateInvoiceDetailDto
    {
        public int MedicineId { get; set; } 
        public int Quantity { get; set; } 
        public int TotalPrice { get; set; }
    }
}