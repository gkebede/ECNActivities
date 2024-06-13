using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
         [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public IActionResult GetBadRequest()
        {
            return BadRequest("This is a bad request");
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        { 
                throw new Exception("Server Exeptiom" );

        }

        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }
    }
}