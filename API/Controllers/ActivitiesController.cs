using Application;
using Application.Activities;
using Application.Activities.core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
   public class ActivitiesController : BaseApiController
   {

      [HttpGet]
      public async Task<IActionResult> GetActivities()
      {
         var result = await Mediator.Send(new List.Query());
         return HandleResult(result);
      }

      [HttpGet("{id}")]
      public async Task<IActionResult> GetActivity(Guid id)
      {
        // var result = await Mediator.Send(new Details.Query { Id = id });
         return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
      }


      [HttpPost]
      public async Task<IActionResult> CreateActivity(Activity activity)
      {
        var result =  await Mediator.Send(new Create.Command { Activity = activity });
         return HandleResult(result);
      }

      [HttpPut("{id}")]
      public async Task<IActionResult> EditActivity(Guid id, Activity activity)
      {
         activity.Id = id;
          var result = await Mediator.Send(new Edit.Command { Activity = activity });
         return HandleResult(result);
      }

      [HttpDelete("{id}")]
      public async Task<IActionResult> DeleteActivity(Guid id)
      {
        var result = await Mediator.Send(new Delete.Command { Id = id });
         return HandleResult(result);
      }

      //  [HttpGet("{notaguid}")]
      //   public IActionResult GetNotAguid(Guid notaguid)
      //   {
      //       return BadRequest("The guidId is not right");
      //   }

   }
}