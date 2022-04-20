import { TourOption } from './Option'
export const clientTourSteps = (intro) => {
  return intro.setOptions({
    ...TourOption,
    steps: [
      {
        element: document.querySelector('#plus'),
        intro: 'This is your client CRM system, click here to add a new client'
      },
      {
        element: document.querySelector('#clientModalInvite'),
        position: 'right',
        intro:
          'Fill in their details, send them a note, and by clicking send they will be invited to join Luna and our App where you can message, they will receive payment links from you etc.'
      }
    ]
  })
}
