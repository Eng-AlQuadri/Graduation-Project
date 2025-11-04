using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications;

public class RefreshTokenSpecification : BaseSpecefication<RefreshToken>
{
    private RefreshTokenSpecification(Expression<Func<RefreshToken, bool>> expression) : base(expression) { }

    public static RefreshTokenSpecification GetRefreshTokenDataByToken(string refreshToken)
    {
        var spec = new RefreshTokenSpecification(x => x.RToken == refreshToken);

        spec.AddInclude(x => x.User);

        return spec;
    }

    public static RefreshTokenSpecification GetRefreshTokenByUserIdAndToken(int userId, string refreshToken)
    {
        var spec = new RefreshTokenSpecification(x => x.UserId == userId && x.RToken == refreshToken);

        return spec;
    }
}