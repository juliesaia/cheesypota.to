import { Component, createSignal } from "solid-js";
import emailjs from "@emailjs/browser";

const Contact: Component<{}> = (props) => {
  const [sending, setSending] = createSignal(false);
  const [sentMessage, setSentMesage] = createSignal(null);
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
          position-relative
          overflow-hidden
        >
          <div
            w-full
            h-full
            position-absolute
            flex
            bg-green-300
            inset-0
            class="-translate-y-full"
            transition-transform-500
            classList={{
              "opacity-0": sentMessage() === null,
              "translate-y-none": sentMessage(),
            }}
          >
            <div m-auto text-black text-4xl>
              Sent!
            </div>
          </div>
          <form
            text-black
            text-xl
            flex
            flex-col
            onSubmit={async (e) => {
              e.preventDefault();
              let form = e.currentTarget;
              let data = new FormData(form);
              setSending(true); // disable form
              await emailjs.send(
                "contact_form_service",
                "contact_form_template",
                Object.fromEntries(data),
                "mxKpYb5GGUKNeUJI8"
              ); // send email
              setSentMesage(true); // pull down panel
              await new Promise((resolve) => setTimeout(resolve, 500)); // wait for animation
              form.reset(); // reset form
              setSending(false); // enable inputs
              await new Promise((resolve) => setTimeout(resolve, 2000)); // keep panel for 2s
              setSentMesage(false); // pull down panel
            }}
          >
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
              type="submit"
              classList={{
                "hover:(bg-green-300 text-black)": !sending(),
              }}
              disabled={sending()}
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
