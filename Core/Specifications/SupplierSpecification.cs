using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications;

public class SupplierSpecification : BaseSpecefication<SupplierUser>
{
    private SupplierSpecification() : this(null) { }
    private SupplierSpecification(Expression<Func<SupplierUser, bool>>? expression) : base(expression) { }

    public static SupplierSpecification GetSupplierDetails(int supplierId)
    {
        var spec = new SupplierSpecification(x => x.Id == supplierId);

        spec.AddInclude(x => x.Medicines);

        return spec;
    }

    public static SupplierSpecification GetSupplierUserData(int supplierId)
    {
        var spec = new SupplierSpecification(x => x.Id == supplierId);

        spec.AddInclude(x => x.AppUser);

        return spec;
    }

    public static SupplierSpecification GetAllSuppliers(SupplierSpecParams supplierSpecParams)
    {
        var spec = new SupplierSpecification();

        spec.ApplyPaging(supplierSpecParams.PageSize * (supplierSpecParams.PageIndex - 1), supplierSpecParams.PageSize);

        return spec;
    }
}