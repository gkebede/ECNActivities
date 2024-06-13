//using AutoMapper;
// using AutoMapper.QueryableExtensions;
using Application.Activities.core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        
        public class Query : IRequest <Result<Activity>>
        {
           public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<Activity>>
        {

        private readonly DataContext _context;
        // private readonly IMapper _mapper;
            public Handler(DataContext context)
            {
            //, IMapper mapper    _mapper = mapper;
            _context = context;
                
            }

            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // var activity = await _context.Activities
                // .ProjectTo<Activity>(_mapper.ConfigurationProvider)
                // .FirstOrDefaultAsync( x => x.Id == request.Id);

                // var result = _context.Activities.FindAsync(request.Id);

               var result =  await _context.Activities.FindAsync(request.Id);
               return Result<Activity>.Success(result);
            }
        }
    }
}
