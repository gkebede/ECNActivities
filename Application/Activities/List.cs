using Application.Activities.core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
// using AutoMapper;
// using AutoMapper.QueryableExtensions;
// Application\Activities\ActivityDto.cs
namespace Application.Activities
{
    public class List
    {

        public class Query : IRequest<Result<List<Activity>>> { }
        // public record Query() : IRequest<Result<List<Activity>>> {}

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {


            private readonly DataContext _context;
           // private readonly IMapper _mapper;

            public Handler(DataContext context)
            {
                _context = context;
                //    , IMapper mapper _mapper = mapper;

            }



            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {


               var result = await _context.Activities.ToListAsync(cancellationToken);  
               return Result<List<Activity>>.Success(result);



                // THIS EAGER LOADING ---

                // var activities = await _context.Activities
                //  .Include(aa => aa.Attendees)
                //  .ThenInclude( u => u.AppUser)
                // .ToListAsync(cancellationToken);
                // var activitiesReturn = _mapper.Map<List<ActivityDto>>(activities);

                // return Result<List<ActivityDto>>.Success(activitiesReturn);

              // THIS PROJECTION (I.E. INHERETED FROM mapping --- instead of using long method like about---) LOADING ---
              //  var activities = await _context.Activities
               // .ProjectTo<Activity>(_mapper.ConfigurationProvider)
               // .ToListAsync(cancellationToken);
              //  return List<ActivityDto>.Success(activities);

            }
        }
    }
}