using System.Linq.Expressions;
using Core.DTOs;
using Core.Entities;

namespace Core.Specifications;

public class MedicineSpecification : BaseSpecefication<Medicine>
{
    private MedicineSpecification() : this(null) { }

    private MedicineSpecification(Expression<Func<Medicine, bool>>? expression) : base(expression) { }

    public static MedicineSpecification GetAllMedicines(MedicineSpecParams medicineSpecParams)
    {
        var spec = new MedicineSpecification();

        spec.ApplyPaging(medicineSpecParams.PageSize * (medicineSpecParams.PageIndex - 1), medicineSpecParams.PageSize);

        return spec;
    }

    public static MedicineSpecification GetAllMedicinesByPatient(int patientId, MedicineSpecParams medicineSpecParams)
    {
        var spec = new MedicineSpecification(x => x.OrderDetails != null && x.OrderDetails.Any(od => od.Order != null && od.Order.PatientId == patientId));

        spec.ApplyPaging(medicineSpecParams.PageSize * (medicineSpecParams.PageIndex - 1), medicineSpecParams.PageSize);

        return spec;
    }

    public static MedicineSpecification GetAllMedicinesBySupplier(int supplierId, MedicineSpecParams medicineSpecParams)
    {
        var spec = new MedicineSpecification(x => x.SupplierId == supplierId);

        spec.ApplyPaging(medicineSpecParams.PageSize * (medicineSpecParams.PageIndex - 1), medicineSpecParams.PageSize);

        spec.ApplyDistinct();

        return spec;
    }

    public static MedicineSpecification GetMedicineByName(string medicineName)
    {
        var spec = new MedicineSpecification(x => x.Name == medicineName);

        return spec;
    }
}

