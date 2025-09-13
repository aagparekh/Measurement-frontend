import {
  Box,
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Toaster, toaster } from "../components/ui/toaster.jsx";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_measurement: {},
  });
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        customer_name: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        customer_measurement: {
          ...prev.customer_measurement,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer_name.trim()) {
      alert("Customer name is required");
      return;
    }

    // Remove empty measurement fields
    const filteredMeasurements = Object.fromEntries(
      Object.entries(formData.customer_measurement).filter(
        ([, value]) => value !== "" && value !== null
      )
    );

    const payload = {
      customer_name: formData.customer_name,
      customer_measurement: filteredMeasurements,
    };

    // console.log("Payload to send:", payload);
    const toastId = toaster.create({
      title: "Adding customer...",
      type: "loading",
    });

    try {
      const res = await fetch(`${API_URL}/api/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toaster.update(toastId, {
          title: "Added!",
          description: "Customer Added successfully",
          type: "success",
        });
        setFormData({
          customer_name: "",
          customer_measurement: {},
        });
      } else {
        toaster.update(formData, {
          title: "Failed",
          description: "Failed to update customer",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    }
  };
  return (
    <Box
      minW={"100vw"}
      alignItems={"center"}
      justifyContent={"center"}
      display={"flex"}
      p={4}
    >
      <form onSubmit={handleSubmit}>
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend>Customer details</Fieldset.Legend>
            <Fieldset.HelperText>
              Please provide your Customer details and Measurement below.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field.Root required>
              <Field.Label>
                Customer Name <Field.RequiredIndicator />
              </Field.Label>
              <Input
                name="name"
                value={formData.customer_name}
                onChange={handleChange}
              />
            </Field.Root>

            <Fieldset.HelperText>
              Please provide your Customer Measurement below.
            </Fieldset.HelperText>

            {[
              "chest",
              "upper_chest",
              "under_chest",
              "stomach",
              "dart_point",
              "sleeves_len",
              "upper_sleeves",
              "lower_sleeves",
              "neck_deep",
              "shoulder",
              "yoke_len",
              "top_len",
              "plazo_len",
              "waist",
              "hip",
              "thigh",
              "knee",
              "armhole",
            ].map((field) => (
              <Field.Root key={field}>
                <Field.Label>{field.replace(/_/g, " ")}</Field.Label>
                <Input
                  name={field}
                  type="number"
                  value={formData.customer_measurement[field] || ""}
                  onChange={handleChange}
                />
              </Field.Root>
            ))}
          </Fieldset.Content>

          <Button type="submit" alignSelf="flex-start">
            Submit
          </Button>
        </Fieldset.Root>
      </form>
      <Toaster />
    </Box>
  );
};

export default AddCustomer;
