import React from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "reactfire";

export default function FormAdd({ latitude, longitude }) {
  const { register, handleSubmit, errors } = useForm();
  const db = useFirestore().collection("announce");
  const onSubmit = data =>
    db.add({
      roomNb: data.roomNb,
      price: data.price,
      description: data.description,
      position: [latitude, longitude]
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="S+"
        name="roomNb"
        type="number"
        ref={register({ required: true, min: 0, max: 15 })}
      />
      {errors.roomNb && <span>this field is required</span>}
      <input
        placeholder="Price"
        name="price"
        type="number"
        ref={register({ required: true, min: 0 })}
      />
      <textarea
        type="text"
        name="description"
        placeholder="Description"
        ref={register({ required: true, minLength: 20 })}
      />
      <input
        type="submit"
        style={{
          background:
            "radial-gradient(166.67% 2021.63% at 0% 13.73%,#5fb2ff 0%, #0085ff 100%)",
          color: "rgb(230, 230, 230)"
        }}
      />
    </form>
  );
}
