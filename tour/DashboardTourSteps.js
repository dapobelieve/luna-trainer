import { TourOption } from './Option'
export const dashboardTourSteps = (intro) => {
  return intro.setOptions({
    ...TourOption,
    steps: [
      {
        element: document.querySelector('#t'),
        intro:
          'This is your home dashboard. You can see everything you need to action from here.'
      },
      {
        element: document.querySelector('#new-action'),
        position: 'right',
        intro:
          'If you quickly want to add a new client, create a new payment request, or schedule a new session, you can do that in one click here.'
      },
      {
        element: document.querySelector('#message-hint-nav'),
        position: 'right',
        intro:
          'Here you will see all unread messages. Just click on an any message to jump into your clients profile to reply and see any relevant notes. '
      },
      {
        element: document.querySelector('#session-st-nav'),
        position: 'right',
        intro:
          'From here you can see all your sessions for the day - schedule a new session, or click view all to jump into your full schedule. '
      },
      {
        element: document.querySelector('#billing-hint-nav'),
        position: 'right',
        intro:
          'Here within payments, you can see all notifications on outstanding or recieved payments. You can quickly send a nudge to your clients to remind them to pay you. '
      },
      // {
      //   element: document.querySelector('#reporting-hint'),
      //   position: 'right',
      //   intro: 'Within reporting you can see a simple overview of how your business is performing.'
      // },
      {
        element: document.querySelector('#settings-hint'),
        position: 'right',
        intro:
          'And finally, if you want to make any changes to your settings, connect new payment platform, change bank details, update your trainer profile, connect a new calender, change your password - you can do that here. '
      }
    ]
  })
}
