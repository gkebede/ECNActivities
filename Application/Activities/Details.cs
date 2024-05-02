//using AutoMapper;
// using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        
        public class Query : IRequest <Activity>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Activity>
        {

        private readonly DataContext _context;
        // private readonly IMapper _mapper;
            public Handler(DataContext context)
            {
            //, IMapper mapper    _mapper = mapper;
            _context = context;
                
            }

            public async Task <Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                // var activity = await _context.Activities
                // .ProjectTo<Activity>(_mapper.ConfigurationProvider)
                // .FirstOrDefaultAsync( x => x.Id == request.Id);

                //return  Result<Activity>.Success(activity);
                // var result = _context.Activities.FindAsync(request.Id);

                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}
