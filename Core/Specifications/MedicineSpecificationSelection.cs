using System.Linq.Expressions;
using Core.DTOs;
using Core.Entities;

namespace Core.Specifications;

public class MedicineSpecificationSelection : BaseSpecefication<Medicine, MedicineSelectDto>
{
    private MedicineSpecificationSelection() : this(null) { }

    private MedicineSpecificationSelection(Expression<Func<Medicine, bool>>? expression) : base(expression) { }

    public static MedicineSpecificationSelection GetAllMedicines()
    {
        var spec = new MedicineSpecificationSelection();

        spec.AddSelect(x => new MedicineSelectDto
        {
            Id = x.Id,
            Name = x.Name,
            Price = x.Price
        });

        return spec;
    }
}