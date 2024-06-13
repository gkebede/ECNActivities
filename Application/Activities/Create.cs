
// using Application.Activities.core;
// using Application.Interfaces;
using Application.Activities.core;
using Domain;
using FluentValidation;

// using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {

        public class Command : IRequest<Result<Unit>> 
        {
            public Activity Activity { get; set; }
        }

         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                //RuleFor( x => x.Title).NotEmpty();
               RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {

                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                    //   int id = _context.Activities.Max(a => a.Id)+1;
                    //    request.Activity.Id = id;

                    _context.Activities.Add(request.Activity);
                 
                 var result =await _context.SaveChangesAsync() > 0;
                 if (!result) 
                 {
                    return Result<Unit>.Failure("Failed to create activity object");
                 }
                 return Result<Unit>.Success(Unit.Value);



                // var user = await _context.Activities.FirstOrDefaultAsync(x =>
                //       x. == _userAccessor.GetUsername());

             

                //     var attendee = new ActivityAttendee
                //     {

                //         AppUser = user,
                //         Activity = request.Activity,
                //         IsHost = true

                //     };
                //     request.Activity.Attendees.Add(attendee);

           



                // await _context.Activities.AddAsync(request.Activity);

                // var result = await _context.SaveChangesAsync() > 0;

                // if (!result)
                // {
                //     return 
                //     Unit>.Failure("Failed to create activity");
                // }

                // return 
                // Unit>.Success(Unit.Value);
            }
        }
    }
}

