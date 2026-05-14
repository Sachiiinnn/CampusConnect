const Joi = require("joi");

module.exports.eventSchema = Joi.object({
    event: Joi.object({
        title: Joi.string()
            .min(5)
            .max(100)
            .required()
            .messages({
                "string.empty": "Title is required",
                "string.min": "Title must be at least 5 characters",
                "string.max": "Title cannot exceed 100 characters"
            }),
        type: Joi.string()
            .valid('Hackathon', 'Internship', 'Fest', 'Workshop')
            .required()
            .messages({
                "any.only": "Type must be one of Hackathon, Internship, Fest, Workshop",
                "string.empty": "Type is required"
            }),
        organizer: Joi.string()
            .required()
            .messages({
                "string.empty": "Organizer is required"
            }),
        mode: Joi.string()
            .valid('Online', 'Offline', 'Hybrid')
            .default('Online'),
        location: Joi.string().default('Delhi-NCR'),
        deadline: Joi.date()
            .required()
            .messages({
                "date.base": "Deadline must be a valid date",
                "any.required": "Deadline is required"
            }),
        applyLink: Joi.string()
            .uri()
            .required()
            .messages({
                "string.uri": "Apply link must be a valid URL",
                "string.empty": "Apply link is required"
            }),
        description: Joi.string()
            .required()
            .messages({
                "string.empty": "Description is required"
            }),
        tags: Joi.array().items(Joi.string().trim()).default([]),
        imageURL: Joi.string()
            .uri()
            .default('https://plus.unsplash.com/premium_photo-1681400688788-a5fd7e7bcd89?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    }).required()
});


module.exports.faqSchema = Joi.object({
  faq: Joi.object({
    question: Joi.string()
      .min(5)
      .max(500)
      .required()
      .messages({
        "string.empty": "Question is required",
        "string.min": "Question must be at least 5 characters",
        "string.max": "Question cannot exceed 500 characters"
      })
  }).required()
});