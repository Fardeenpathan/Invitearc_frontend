import { SlNote, SlCalender } from "react-icons/sl";
import {
  FaRegEnvelopeOpen,
  FaRegCommentDots,
  FaStopwatch,
} from "react-icons/fa";
import { GiLoveSong } from "react-icons/gi";
import { AiOutlineShareAlt } from "react-icons/ai";

export const hitchedEditorFields = {
  tabs: [
    {
      id: "details",
      label: "Details",
      icon: SlNote,
    },
    {
      id: "events",
      label: "Events",
      icon: SlCalender,
    },
    {
      id: "coupleMessage",
      label: "Couple",
      icon: FaRegCommentDots,
    },
    {
      id: "rsvp",
      label: "RSVP",
      icon: FaRegEnvelopeOpen,
    },
    {
      id: "countdown",
      label: "Countdown",
      icon: FaStopwatch,
    },
    {
      id: "music",
      label: "Music",
      icon: GiLoveSong,
    },
    {
      id: "publish",
      label: "Publish",
      icon: AiOutlineShareAlt,
    },
  ],
detailFields: [
    { name: "familyName", label: "Family name", type: "text" },
    { name: "headline", label: "Headline", type: "text" },
    { name: "inviteLine", label: "Invitation line", type: "text" },
    { name: "eventIntro", label: "Event intro", type: "text" },
    { name: "groomName", label: "Groom name", type: "text" },
    { name: "brideName", label: "Bride name", type: "text" },
    { name: "groomDetails", label: "Groom details", type: "textarea" },
    { name: "brideDetails", label: "Bride details", type: "textarea" },
    { name: "brideGrandParentsName", label: "Bride GrandParents Name", type: "textarea" },
    { name: "noteText", label: "Note text", type: "textarea" },
  ],
  eventFields: [
    { name: "title_ceremony", label: "Title", type: "text" },
    { name: "date", label: "Date", type: "text" },
    { name: "time", label: "Time", type: "text" },
    { name: "venue", label: "Venue", type: "text" },
    { name: "venue_address", label: "Address", type: "textarea" },
    { name: "theme", label: "Theme", type: "textarea" },
    { name: "link", label: "Route link", type: "text" },
  ],

  publishFields: [
    {
      name: "sharePreviewImage",
      label: "Preview Image",
      type: "image",
    },
    {
      name: "sharePreviewTitle",
      label: "Preview Title",
      type: "text",
    },
    {
      name: "sharePreviewDescription",
      label: "Preview Description",
      type: "textarea",
    },
  ],

};