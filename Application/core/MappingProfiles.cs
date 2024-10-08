using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.core
{
    public class MappingProfiles : Profile
    {

        public MappingProfiles()
        {

             // d == destenation   && o == options && s == source of value

             // todo  Mapping  Activity -to- Activity
            CreateMap<Activity, Activity>();
            // todo  Mapping  Activity -to- ActivityDto
            CreateMap<Activity, ActivityDto>()
           .ForMember(d => d.HostUsername, o => o.MapFrom(s =>
            s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));


                     // todo  Mapping  ActivityAttendee -to- Profiles.Profile
           // CreateMap<ActivityAttendee, Profiles.Profile>()
          CreateMap<ActivityAttendee, AttendeeDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
    // todo  Mapping  AppUser -to- Profiles.Profile
                CreateMap<AppUser, Profiles.Profile>()
               .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
               // .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
              //  .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
               // .ForMember(d => d.Following,
               //     o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));

        }


    }
}