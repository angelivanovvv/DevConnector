import { fromJS } from "immutable";

/*-------------------------------- PROFILE FORM CONFIGs --------------------------------*/
export const profileFields = ({
  company,
  website,
  location,
  skills,
  githubusername
}) =>
  fromJS([
    {
      key: 1,
      type: "text",
      value: company,
      placeholder: "Company",
      name: "company",
      label: "Could be your own company or one you work for"
    },
    {
      key: 2,
      type: "text",
      value: website,
      placeholder: "Website",
      name: "website",
      label: "Could be your own or a company website"
    },
    {
      key: 3,
      type: "text",
      value: location,
      placeholder: "Location",
      name: "location",
      label: "City & state suggested (eg. Boston, MA)"
    },
    {
      key: 4,
      type: "text",
      value: skills,
      placeholder: "Skills",
      name: "skills",
      label: "Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
    },
    {
      key: 5,
      type: "text",
      value: githubusername,
      placeholder: "Github Username",
      name: "githubusername",
      label:
        "If you want your latest repos and a Github link, include your username"
    }
  ]);

export const mediaFields = ({
  twitter,
  facebook,
  youtube,
  linkedin,
  instagram
}) =>
  fromJS([
    {
      key: 1,
      type: "text",
      value: twitter,
      placeholder: "Twitter URL",
      name: "twitter",
      icon: "fa-twitter"
    },
    {
      key: 2,
      type: "text",
      value: facebook,
      placeholder: "Facebook URL",
      name: "facebook",
      icon: "fa-facebook"
    },
    {
      key: 3,
      type: "text",
      value: youtube,
      placeholder: "YouTube URL",
      name: "youtube",
      icon: "fa-youtube"
    },
    {
      key: 4,
      type: "text",
      value: linkedin,
      placeholder: "Linkedin URL",
      name: "linkedin",
      icon: "fa-linkedin"
    },
    {
      key: 5,
      type: "text",
      value: instagram,
      placeholder: "Instagram URL",
      name: "instagram",
      icon: "fa-instagram"
    }
  ]);

export const media = fromJS([
  {
    twitter: "fa-twitter"
  },
  {
    facebook: "fa-facebook"
  },
  {
    youtube: "fa-youtube"
  },
  {
    linkedin: "fa-linkedin"
  },
  {
    instagram: "fa-instagram"
  }
]);

/*-------------------------------- SELECT FIELD CONFIGs --------------------------------*/

export const options = fromJS([
  {
    key: 1,
    name: "* Select Professional Status",
    value: "0"
  },
  {
    key: 2,
    name: "Developer",
    value: "Developer"
  },
  {
    key: 3,
    name: "Junior Developer",
    value: "Junior Developer"
  },
  {
    key: 4,
    name: "Senior Developer",
    value: "Senior Developer"
  },
  {
    key: 5,
    name: "Manager",
    value: "Manager"
  },
  {
    key: 6,
    name: "Student or Learning",
    value: "Student or Learning"
  },
  {
    key: 7,
    name: "Instructor",
    value: "Instructor"
  },
  {
    key: 8,
    name: "Intern",
    value: "Intern"
  },
  {
    key: 9,
    name: "Other",
    value: "Other"
  }
]);

/*-------------------------------- SKILLS FORM CONFIGs --------------------------------*/
export const experienceFields = ({ title, company, location }) =>
  fromJS([
    {
      key: 1,
      type: "text",
      value: title,
      placeholder: "* Job Title",
      name: "title"
    },
    {
      key: 2,
      type: "text",
      value: company,
      placeholder: "* Company",
      name: "company"
    },
    {
      key: 3,
      type: "text",
      value: location,
      placeholder: "* Location",
      name: "location"
    }
  ]);

export const educationFields = ({ school, degree, fieldofstudy }) =>
  fromJS([
    {
      key: 1,
      type: "text",
      value: school,
      placeholder: "* School or Bootcamp",
      name: "school"
    },
    {
      key: 2,
      type: "text",
      value: degree,
      placeholder: "* Degree or Certificate",
      name: "degree"
    },
    {
      key: 3,
      type: "text",
      value: fieldofstudy,
      placeholder: "* Field of study",
      name: "fieldofstudy"
    }
  ]);

/*-------------------------------- DASHBOARD TABLE CONFIGs --------------------------------*/
export const experienceRows = fromJS([
  {
    id: 1,
    key: "company",
    title: "Company",
    class: ""
  },
  {
    id: 2,
    key: "title",
    title: "Title",
    class: "hide-sm"
  },
  {
    id: 3,
    key: "years",
    title: "Years",
    class: "hide-sm"
  },
  {
    id: 4,
    key: "button",
    title: "",
    class: ""
  }
]);

export const educationRows = fromJS([
  {
    id: 5,
    key: "school",
    title: "School",
    class: ""
  },
  {
    id: 6,
    key: "degree",
    title: "Degree",
    class: "hide-sm"
  },
  {
    id: 7,
    key: "years",
    title: "Years",
    class: "hide-sm"
  },
  {
    id: 8,
    key: "button",
    title: "",
    class: ""
  }
]);
