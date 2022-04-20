import { TourOption } from './Option'
export const paymentTourSteps = (intro) => {
  return intro.setOptions({
    ...TourOption,
    steps: [
      {
        element: document.querySelector('#plus'),
        intro:
          'This is your payment action, click here to create a payment request'
      },
      {
        element: document.querySelector('#sent'),
        position: 'bottom',
        intro: 'Filter your payments down by sent, draft here.'
      }
    ]
  })
}
