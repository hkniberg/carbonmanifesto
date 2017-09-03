import {Texts} from "../lib/collection"

Meteor.startup(function () {

  if (!Meteor.users.findOne()) {
    //Oh, no user in DB! Let's add an admin user with default password.
    const userId = Accounts.createUser({
      email: "admin@carbonmanifesto.org",
      password: "admin"
    })
    Roles.addUsersToRoles(userId, 'admin')
    console.log("Created a user 'admin@carbonmanifesto.org' with password 'admin'.\nIf this is a production system then, well, you know what you need to do!")
  }

  if (!Texts.findOne()) {
    //Oh, no texts in DB. Let's add the default english version of the manifesto (copied from prod DB)
    Texts.insert(
      {
        "languageCode": "en",
        "languageName": "English",
        "status": "published",
        "header": "Zero Carbon Manifesto",
        "background": "Global warming is the [biggest threat](http://ipcc.ch/pdf/assessment-report/ar5/syr/AR5_SYR_FINAL_SPM.pdf) to humanity, and [carbon emissions](http://iopscience.iop.org/article/10.1088/1748-9326/11/4/048002) are the main cause. We emit [50 billion](http://www.iea.org/publications/freepublications/publication/KeyCO2EmissionsTrends.pdf) tons of greenhouse gases per year, [3-18 tons per person](http://www.ipcc.ch/pdf/assessment-report/ar5/wg3/ipcc_wg3_ar5_technical-summary.pdf) depending on income level. The higher your footprint is, the more likely you have the means to [reduce it](http://everytoncounts.org/carbonguide). So, will you do it?\n\nTake a stand, sign the manifesto, and help spread it far and wide! [#everytoncounts](http://everytoncounts.org)\n\nWant to learn more? Check out the animated video [Friendly Guide to Climate Change](https://www.youtube.com/watch?v=3CM_KkDuzGQ).\n\n",
        "pledge": "I hereby commit to reduce my personal carbon footprint to zero.",
        "bullet1": "I will, to the best of my knowledge and ability, estimate my carbon footprint and take action to eliminate it completely ([how?](http://everytoncounts.org/carbonguide)). That means my net yearly contribution to global warming will be zero or less. ",
        "bullet2": "I realize that this alone won’t stop global warming. But eliminating my personal footprint is a starting point, a commitment to at least not make the problem worse.",
        "bullet3": "I make this pledge here, in the open, to increase the likelihood that I follow through on it, and to inspire others to join.",
        "footnote": "This pledge can be fulfilled by making investments, carbon-offsetting my travels, changing habits, changing consumption patterns, providing tools and services, or whatever other means I find credible and acceptable. See the [Carbon Reduction Guide](http://everytoncounts.org/carbonguide).",
        "signIt": "Sign it!",
        "name": "Name",
        "country": "Country",
        "youSignedIt": "Congrats, you've signed the manifesto!",
        "joinMailingList": "Do you want to join the mailing list?",
        "selectOne": "select one",
        "aboutYou": "About you (optional)",
        "aboutYouPlaceholder": "Organization, role, or anything else you want to share",
        "comments": "Comments (optional)",
        "yourNameWillBeListed": "Your name and comments will be listed below. Any off-topic stuff will be removed.",
        "pleaseWriteYourName": "Please write your name. Otherwise it'll be a pretty boring signature...",
        "pleaseWriteYourEmail": "We'll need your email address.",
        "somethingWentWrong": "Oops. This is embarrassing. Something went wrong! Definitely not your fault. If you know how, please check the browser console and email the error message to info@carbonmanifesto.org. Thanks!",
        "closeForm": "No, close this form.",
        "emailAddress": "Email address",
        "emailAddressInfo": "Max 1 message per month, and only stuff related to CO2 reduction. We won't spam you or share your email with anyone.",
        "yesPlease": "Yes please",
        "noThanks": "No thanks",
        "signatoriesInTotal": "signatories in total",
        "latestSignatories": "Latest signatories"
      }
    )
  }
  console.log("Surf to " + Meteor.absoluteUrl() + "admin to administrate translations")

})


