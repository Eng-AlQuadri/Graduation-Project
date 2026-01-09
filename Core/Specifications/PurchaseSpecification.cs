using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications;

public class PurchaseSpecification : BaseSpecefication<Purchase>
{
    private PurchaseSpecification() : this(null) { }

    private PurchaseSpecification(Expression<Func<Purchase, bool>>? expression) : base(expression) { }

    public static PurchaseSpecification GetAllPurchases(PurchaseSpecParams purchaseSpecParams)
    {
        var spec = new PurchaseSpecification();

        spec.AddInclude(x => x.Medicine);

        spec.AddInclude(x => x.Supplier.AppUser);

        spec.ApplyPaging(purchaseSpecParams.PageSize * (purchaseSpecParams.PageIndex - 1), purchaseSpecParams.PageSize);

        return spec;
    }

    public static PurchaseSpecification GetPurchasesBySupplier(int supplierId, PurchaseSpecParams purchaseSpecParams)
    {
        var spec = new PurchaseSpecification(x => x.SupplierId == supplierId);

        spec.ApplyPaging(purchaseSpecParams.PageSize * (purchaseSpecParams.PageIndex - 1), purchaseSpecParams.PageSize);

        spec.AddInclude(x => x.Medicine);

        spec.AddInclude(x => x.Supplier.AppUser);

        return spec;
    }
}