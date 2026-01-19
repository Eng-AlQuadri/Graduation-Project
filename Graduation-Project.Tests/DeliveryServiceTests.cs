using API.ApiServices;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Moq;

namespace Graduation_Project.Tests;

public class DeliveryServiceTests
{

    private readonly Mock<IUnitOfWork> _uowMock;
    private readonly Mock<IGenericRepository<Delivery>> _deliveryRepoMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<IHttpContextAccessor> _httpContextMock;
    private readonly Mock<UserManager<AppUser>> _userManagerMock;
    private readonly DeliveryService _deliveryService;


    public DeliveryServiceTests()
    {
        _uowMock = new Mock<IUnitOfWork>();
        _deliveryRepoMock = new Mock<IGenericRepository<Delivery>>();
        _mapperMock = new Mock<IMapper>();
        _httpContextMock = new Mock<IHttpContextAccessor>();
        _userManagerMock = MockUserManager();
        
        _uowMock
            .Setup(u => u.Repository<Delivery>())
            .Returns(_deliveryRepoMock.Object);

        _deliveryService = new DeliveryService(
            _mapperMock.Object,
            _uowMock.Object,
            _httpContextMock.Object,
            _userManagerMock.Object
        );
    }


    [Fact]
    public async Task ModifyDeliveryStatus_ShouldReturn400_WhenDeliveryNotFound()
    {
        // Arrange

        _deliveryRepoMock
            .Setup(r => r.GetEntityWithSpec(It.IsAny<ISpecification<Delivery>>()))
            .ReturnsAsync((Delivery?)null);

        // Act

        var result = await _deliveryService.ModifyDeliveryStatus(1);

        // Assert

        result.Success.Should().BeFalse();

        result.StatusCode.Should().Be(400);

        result.Message.Should().Be("Delivery not found");
    }


    [Fact]
    public async Task ModifyDeliveryStatus_ShouldUpdateAndReturn200_WhenSavedSuccessfully()
    {
        // Arrange

        var delivery = new Delivery
        {
            Id = 1000,
            Status = 0
        };


        _deliveryRepoMock
            .Setup(x => x.GetEntityWithSpec(It.IsAny<ISpecification<Delivery>>()))
            .ReturnsAsync(delivery);

        // _uowMock
        //     .Setup(x => x.Repository<Delivery>())
        //     .Returns(_deliveryRepoMock.Object);

        _uowMock
            .Setup(x => x.Complete())
            .ReturnsAsync(true);

        // Act

        var result = await _deliveryService.ModifyDeliveryStatus(1);


        // Assert

        result.Success.Should().Be(true);
        
        result.StatusCode.Should().Be(200);

        delivery.Status.Should().Be(1);

        delivery.CompletedAt.Should().NotBeNull();

        _uowMock.Verify(x => x.Complete(), Times.Once);

        _deliveryRepoMock.Verify(x => x.Update(delivery), Times.Once);
    }


    [Fact]
    public async Task ModifyDeliveryStatus_ShouldReturn500_WhenSaveFails()
    {
        // Arrange

        var delivery = new Delivery { Id = 10005 };


        _deliveryRepoMock
            .Setup(x => x.GetEntityWithSpec(It.IsAny<ISpecification<Delivery>>()))
            .ReturnsAsync(delivery);

        _uowMock
            .Setup(x => x.Complete())
            .ReturnsAsync(false);


        // Act

        var result = await _deliveryService.ModifyDeliveryStatus(1);

        // Assert
        
        result.Success.Should().BeFalse();
        result.StatusCode.Should().Be(500);
    }


    private static Mock<UserManager<AppUser>> MockUserManager()
    {
        var store = new Mock<IUserStore<AppUser>>();
        return new Mock<UserManager<AppUser>>(
            store.Object,
            null!, null!, null!, null!, null!, null!, null!, null!
        );
    }
}