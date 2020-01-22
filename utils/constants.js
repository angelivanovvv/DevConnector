const validationRules = {
  login: {
    email: {
      name: "email",
      value: "Please enter valid email"
    },
    password: {
      name: "password",
      value: "Password is required"
    }
  },
  register: {
    name: {
      name: "name",
      value: "Name is required"
    },
    email: {
      name: "email",
      value: "Please enter valid email"
    },
    password: {
      name: "password",
      value: "Please enter password with 6 or more characters"
    }
  },
  profile: {
    status: {
      name: "status",
      value: "Status is required"
    },
    skills: {
      name: "skills",
      value: "Skills is required"
    }
  },
  experience: {
    title: {
      name: "title",
      value: "Title is required"
    },
    company: {
      name: "company",
      value: "Company is required"
    },
    from: {
      name: "from",
      value: "From date is required"
    }
  },
  education: {
    school: {
      name: "school",
      value: "School is required"
    },
    degree: {
      name: "degree",
      value: "Degree is required"
    },
    fieldofstudy: {
      name: "fieldofstudy",
      value: "Field of study is required"
    },
    from: {
      name: "from",
      value: "From date is required"
    }
  },
  post: {
    text: {
      name: "text",
      value: "Text is required"
    }
  }
};

module.exports = {
  validationRules: validationRules
};
