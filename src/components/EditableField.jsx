import { useState } from "react";
import { Editable, IconButton } from "@chakra-ui/react"; // adjust if using Ark or another lib
import { LuPencilLine, LuX, LuCheck } from "react-icons/lu";

function EditableField({ id, fieldName, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("first");
    try {
      setLoading(true);
      const parsedValue = isNaN(value.value)
        ? value.value
        : Number(value.value);
      let body = {};

      if (fieldName === "customer_name") {
        body.customer_name = parsedValue; // update name
      } else {
        body = {
          customer_measurement: {
            [fieldName]: parsedValue, // update one measurement
          },
        };
      }
      console.log(JSON.stringify(body));
      const res = await fetch(`/api/customer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data);
      console.log("Updated successfully");
    } catch (error) {
      console.error("Error updating:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Editable.Root
      defaultValue={String(defaultValue)}
      onValueChange={(val) => setValue(val)}
      onValueCommit={handleSubmit} // this fires when ✅ is clicked or Enter pressed
    >
      <Editable.Preview />
      <Editable.Input />
      <Editable.Control>
        <Editable.EditTrigger asChild>
          <IconButton variant="ghost" size="xs">
            <LuPencilLine />
          </IconButton>
        </Editable.EditTrigger>
        <Editable.CancelTrigger asChild>
          <IconButton variant="outline" size="xs">
            <LuX />
          </IconButton>
        </Editable.CancelTrigger>
        <Editable.SubmitTrigger asChild>
          <IconButton
            variant="outline"
            size="xs"
            isLoading={loading} // optional spinner
          >
            <LuCheck />
          </IconButton>
        </Editable.SubmitTrigger>
      </Editable.Control>
    </Editable.Root>
  );
}

export default EditableField;
