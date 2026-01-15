using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications;

public class CardSpecification : BaseSpecefication<InsuranceCard>
{
    private CardSpecification() : this(null) {}

    private CardSpecification(Expression<Func<InsuranceCard, bool>>? expression) : base(expression) {}

    public static CardSpecification GetCards()
    {
        var spec = new CardSpecification();

        spec.AddInclude(x => x.InsuranceCompany);

        return spec;
    }
}