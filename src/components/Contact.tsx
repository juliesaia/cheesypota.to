import { Component, createSignal } from "solid-js";
import emailjs from "@emailjs/browser";

const Contact: Component<{}> = (props) => {
  let form: HTMLFormElement;
  const [sending, setSending] = createSignal(false);
  return (
    <div pt-20 text-green-300>
      <div text-center text-4xl font-bold mb-10>
        Contact
      </div>
      <div
        text-2xl
        mt-8
        flex
        items-center
        justify-evenly
        lt-sm:flex-col
        mx-12
        pb-10
      >
        <div text-center px-4>
          Let's get in touch!
        </div>

        <div
          border
          border-green-300
          border-width-4
          max-w-150
          w-full
          rounded-xl
          shadow-xl
          p-4
          mt-4
          flex-grow
        >
          <form id="form" ref={form} text-black text-xl flex flex-col>
            <input
              input
              name="name"
              placeholder="Name..."
              aria-label="Name"
              disabled={sending()}
            />
            <input
              input
              name="email"
              placeholder="Email..."
              aria-label="Email"
              disabled={sending()}
            />
            <textarea
              input
              h-50
              name="message"
              placeholder="Message..."
              aria-label="Message"
              disabled={sending()}
            />
            <button
              text-green-300
              rounded-xl
              border
              border-green-300
              py-5
              transition-colors
              type="button"
              classList={{
                "hover:(bg-green-300 text-black)": !sending(),
              }}
              disabled={sending()}
              onClick={async () => {
                setSending(true);
                // await emailjs.sendForm(
                //   "contact_form_service",
                //   "contact_form_template",
                //   "#form",
                //   "mxKpYb5GGUKNeUJI8"
                // );
                await new Promise((resolve) => setTimeout(resolve, 1000));
                form.reset();
                setSending(false);
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
