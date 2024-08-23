using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
// using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.core;
// Application\Activities\ActivityDto.cs
namespace Application.Activities
{
    public class List
    {

        public class Query : IRequest<Result<List<ActivityDto>>> { }
        // public record Query() : IRequest<Result<List<ActivityDto>>> {}

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {


            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;

            }



            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {

                /*
               var activities = await _context.Activities
               .Include(a => a.Attendees)
               .ThenInclude(u => u.AppUser)
               .ToListAsync(cancellationToken); 
               var ActivitiesToReturn = _mapper.Map<List<ActivityDto>>(activities);
               return Result<List<ActivityDto>>.Success(ActivitiesToReturn);
               */



                // THIS EAGER LOADING ---it is costy b/c it includes the ff:
                //-Access Failed, 
                //-count a concurrency stamp,  
                //-the lock out enabled ... and, etc  thus we use Projection (I.E. INHERETED FROM mapping)
 

               var activities = await _context.Activities
               //ProjectTo  === using AutoMapper.QueryableExtensions;
               .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
               .ToListAsync(cancellationToken);
               return Result<List<ActivityDto>>.Success(activities);

            }
        }
    }
}