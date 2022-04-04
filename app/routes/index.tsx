import { json, Form, useActionData, useTransition } from 'remix';
import type { ActionFunction } from 'remix';
// Images
import IconStar from '../../public/images/icon-star.svg';
import ThankYouHero from '../../public/images/illustration-thank-you.svg';
import { useEffect, useRef } from 'react';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const rating = formData.get('rating');
  console.log(rating);
  return json({ rating });
};

export default function Home() {
  const actionData = useActionData();
  const transition = useTransition();
  const state: 'idle' | 'success' | 'error' | 'submitting' =
    transition.submission
      ? 'submitting'
      : actionData?.rating
      ? 'success'
      : actionData?.rating === null
      ? 'error'
      : 'idle';

  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state === 'success') {
      successRef.current?.focus();
    }
  });

  return (
    <>
      <main className="main">
        {state !== 'success' ? (
          <Form className="main__container" replace method="post">
            <div className="main__img-container">
              <img
                src={IconStar}
                alt=""
                className="main__star-img"
                aria-hidden="true"
              />
            </div>
            <h1 className="main__title">How did we do?</h1>

            <p className="main__instruction">
              Please let us know how we did with your support request. All
              feedback is appreciated to help us improve our offering!
            </p>
            <div className="main__rating-container">
              <div className="main__input-container">
                <input
                  type="radio"
                  value="1"
                  id="rating1"
                  name="rating"
                  aria-describedby="error-message"
                />
                <label htmlFor="rating1">
                  <span>1</span>
                </label>
              </div>
              <div className="main__input-container">
                <input type="radio" value="2" id="rating2" name="rating" />
                <label htmlFor="rating2">
                  <span>2</span>
                </label>
              </div>
              <div className="main__input-container">
                <input type="radio" value="3" id="rating3" name="rating" />
                <label htmlFor="rating3">
                  <span>3</span>
                </label>
              </div>
              <div className="main__input-container">
                <input type="radio" value="4" id="rating4" name="rating" />
                <label htmlFor="rating4">
                  <span>4</span>
                </label>
              </div>
              <div className="main__input-container">
                <input type="radio" value="5" id="rating5" name="rating" />
                <label htmlFor="rating5">
                  <span>5</span>
                </label>
              </div>
            </div>
            {state === 'error' && (
              <p
                className="main__error"
                aria-live="assertive"
                id="error-message"
              >
                Please select one of above ratings.
              </p>
            )}
            <button type="submit" className="btn">
              Submit
            </button>
          </Form>
        ) : (
          <div className="complete-container">
            <div className="complete__img-container">
              <img src={ThankYouHero} alt="" aria-hidden="true" />
            </div>
            <p className="complete__rating">
              You selected {actionData.rating} out of 5
            </p>
            <h1 className="complete__title" ref={successRef} tabIndex={-1}>
              Thank you!
            </h1>
            <p className="complete__description">
              We appreciate you taking the time to give a rating. If you ever
              need more support, don&apos;t hesitate to get in touch!
            </p>
          </div>
        )}
      </main>
      <footer>
        <div className="attribution">
          Challenge by{' '}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by{' '}
          <a href="https://www.frontendmentor.io/profile/Sloth247">
            Yuko Horita
          </a>
          .
        </div>
      </footer>
    </>
  );
}
