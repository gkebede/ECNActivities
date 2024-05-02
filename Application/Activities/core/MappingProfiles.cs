using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.core
{
    public class MappingProfiles : Profile
    {

        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();

            // CreateMap<Activity, ActivityDto>()
            // .ForMember( d => d.HostUsername, o => o.MapFrom( s => 
            // s.Attendees.FirstOrDefault( x => x.IsHost).AppUser.UserName));
            //         // d == destenation   && o origin of value
            // CreateMap<ActivityAttendee, Profiles.Profile>()
            // .ForMember( d => d.DisplayName, o => o.MapFrom( s => s.AppUser.DisplayName))
            // .ForMember( d => d.Username, o => o.MapFrom( s => s.AppUser.UserName))
            // .ForMember( d => d.Bio, o => o.MapFrom( s => s.AppUser.Bio));

        }
        
        
    }
}