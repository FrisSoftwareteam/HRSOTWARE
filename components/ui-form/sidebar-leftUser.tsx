"use client";

import * as React from "react";
import {
  Contact,
  Database,
  GalleryVerticalEnd,
  SquareCheckBig,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";

import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
// const data = {
//   teams: [
//     {
//       name: "FRIS PORTAL",
//       logo: Command,
//       plan: "ADMIN",
//     },
//   ],
//   navMain: [
//     {
//       title: "Data Migration",
//       url: "/",
//       icon: Database,
//     },
//     {
//       title: "Appr",
//       url: "#",
//       icon: Sparkles,
//     },
//     {
//       title: "Home",
//       url: "#",
//       icon: Home,
//       isActive: true,
//     },
//     {
//       title: "Inbox",
//       url: "#",
//       icon: Inbox,
//       badge: "10",
//     },
//   ],
//   navSecondary: [
//     {
//       title: "Calendar",
//       url: "#",
//       icon: Calendar,
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//     },
//     {
//       title: "Templates",
//       url: "#",
//       icon: Blocks,
//     },
//     {
//       title: "Trash",
//       url: "#",
//       icon: Trash2,
//     },
//     {
//       title: "Help",
//       url: "#",
//       icon: MessageCircleQuestion,
//     },
//   ],
//   favorites: [
//     {
//       name: "Project Management & Task Tracking",
//       url: "#",
//       emoji: "📊",
//     },
//     {
//       name: "Family Recipe Collection & Meal Planning",
//       url: "#",
//       emoji: "🍳",
//     },
//     {
//       name: "Fitness Tracker & Workout Routines",
//       url: "#",
//       emoji: "💪",
//     },
//     {
//       name: "Book Notes & Reading List",
//       url: "#",
//       emoji: "📚",
//     },
//     {
//       name: "Sustainable Gardening Tips & Plant Care",
//       url: "#",
//       emoji: "🌱",
//     },
//     {
//       name: "Language Learning Progress & Resources",
//       url: "#",
//       emoji: "🗣️",
//     },
//     {
//       name: "Home Renovation Ideas & Budget Tracker",
//       url: "#",
//       emoji: "🏠",
//     },
//     {
//       name: "Personal Finance & Investment Portfolio",
//       url: "#",
//       emoji: "💰",
//     },
//     {
//       name: "Movie & TV Show Watchlist with Reviews",
//       url: "#",
//       emoji: "🎬",
//     },
//     {
//       name: "Daily Habit Tracker & Goal Setting",
//       url: "#",
//       emoji: "✅",
//     },
//   ],
//   // workspaces: [
//   //   {
//   //     name: "Personal Life Management",
//   //     emoji: "🏠",
//   //     pages: [
//   //       {
//   //         name: "Daily Journal & Reflection",
//   //         url: "#",
//   //         emoji: "📔",
//   //       },
//   //       {
//   //         name: "Health & Wellness Tracker",
//   //         url: "#",
//   //         emoji: "🍏",
//   //       },
//   //       {
//   //         name: "Personal Growth & Learning Goals",
//   //         url: "#",
//   //         emoji: "🌟",
//   //       },
//   //     ],
//   //   },
//   //   {
//   //     name: "Professional Development",
//   //     emoji: "💼",
//   //     pages: [
//   //       {
//   //         name: "Career Objectives & Milestones",
//   //         url: "#",
//   //         emoji: "🎯",
//   //       },
//   //       {
//   //         name: "Skill Acquisition & Training Log",
//   //         url: "#",
//   //         emoji: "🧠",
//   //       },
//   //       {
//   //         name: "Networking Contacts & Events",
//   //         url: "#",
//   //         emoji: "🤝",
//   //       },
//   //     ],
//   //   },
//   //   {
//   //     name: "Creative Projects",
//   //     emoji: "🎨",
//   //     pages: [
//   //       {
//   //         name: "Writing Ideas & Story Outlines",
//   //         url: "#",
//   //         emoji: "✍️",
//   //       },
//   //       {
//   //         name: "Art & Design Portfolio",
//   //         url: "#",
//   //         emoji: "🖼️",
//   //       },
//   //       {
//   //         name: "Music Composition & Practice Log",
//   //         url: "#",
//   //         emoji: "🎵",
//   //       },
//   //     ],
//   //   },
//   //   {
//   //     name: "Home Management",
//   //     emoji: "🏡",
//   //     pages: [
//   //       {
//   //         name: "Household Budget & Expense Tracking",
//   //         url: "#",
//   //         emoji: "💰",
//   //       },
//   //       {
//   //         name: "Home Maintenance Schedule & Tasks",
//   //         url: "#",
//   //         emoji: "🔧",
//   //       },
//   //       {
//   //         name: "Family Calendar & Event Planning",
//   //         url: "#",
//   //         emoji: "📅",
//   //       },
//   //     ],
//   //   },
//   //   {
//   //     name: "Travel & Adventure",
//   //     emoji: "🧳",
//   //     pages: [
//   //       {
//   //         name: "Trip Planning & Itineraries",
//   //         url: "#",
//   //         emoji: "🗺️",
//   //       },
//   //       {
//   //         name: "Travel Bucket List & Inspiration",
//   //         url: "#",
//   //         emoji: "🌎",
//   //       },
//   //       {
//   //         name: "Travel Journal & Photo Gallery",
//   //         url: "#",
//   //         emoji: "📸",
//   //       },
//   //     ],
//   //   },
//   // ],
// };

const data = {
  user: {
    name: "FRIS PORTAL",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "FRIS PORTAL",
      logo: GalleryVerticalEnd,
      plan: "USER",
    },
  ],
  navMain: [
    {
      title: "Employee Mgt.",
      url: "#",
      icon: Contact,
      show: true,
      isActive: true,
      items: [
        {
          title: "Employee Dashboard",
          url: "/users",
        },
        // {
        //   title: "Add Department",
        //   url: "#",
        // },
        // {
        //   title: "Add Reporting Officer(s)",
        //   url: "/admin/admin-reporting-chain",
        // },

        {
          title: "Enabled Self-Services",
          url: "#",
        },
      ],
    },
    {
      title: "Performance Mgt.",
      url: "#",
      icon: SquareCheckBig,
      show: true,
      isActive: true,
      items: [
        {
          title: " Appraisal Log(s)",
          url: "/users/appraisal",
        },
        // {
        //   title: "Appriasal Form Log(s)",
        //   url: "/admin/admin-form-log",
        // },
        // {
        //   title: "Appriasal WorkFlow",
        //   url: "/admin/admin-workflow",
        // },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   show: true,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   show: true,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },

    {
      title: "Data Migration",
      url: "#",
      icon: Database,
      show: false,
      // isActive: true,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
  ],
};

export function SidebarLeftUser({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavFavorites favorites={data.favorites} /> */}
        {/* <NavWorkspaces workspaces={data.workspaces} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
