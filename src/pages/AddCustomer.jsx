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
            <h3>Chest Area</h3>
            <Field.Root>
              <Field.Label>Chest</Field.Label>
              <Input
                name="chest"
                type="number"
                value={formData.customer_measurement.chest || ""}
                onChange={handleChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Upper Chest</Field.Label>
              <Input
                name="upper_chest"
                type="number"
                value={formData.customer_measurement.upper_chest || ""}
                onChange={handleChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Under Chest</Field.Label>
              <Input
                name="under_chest"
                type="number"
                value={formData.customer_measurement.under_chest || ""}
                onChange={handleChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Stomach</Field.Label>
              <Input
                name="stomach"
                type="number"
                value={formData.customer_measurement.stomach || ""}
                onChange={handleChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Dart Point</Field.Label>
              <Input
                name="dart_point"
                type="number"
                value={formData.customer_measurement.dart_point || ""}
                onChange={handleChange}
              />
            </Field.Root>

            {/* Sleeves Section */}
            <h3>Sleeves</h3>
            <Box display={"flex"} gap={2}>
              <Field.Root>
                <Field.Label>Sleeves Length</Field.Label>
                <Input
                  name="sleeves_len"
                  type="number"
                  value={formData.customer_measurement.sleeves_len || ""}
                  onChange={handleChange}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Upper Sleeves</Field.Label>
                <Input
                  name="upper_sleeves"
                  type="number"
                  value={formData.customer_measurement.upper_sleeves || ""}
                  onChange={handleChange}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Lower Sleeves</Field.Label>
                <Input
                  name="lower_sleeves"
                  type="number"
                  value={formData.customer_measurement.lower_sleeves || ""}
                  onChange={handleChange}
                />
              </Field.Root>
            </Box>

            {/* Other Section */}
            <Field.Root>
              <Field.Label>Neck Deep</Field.Label>
              <Input
                name="neck_deep"
                type="number"
                value={formData.customer_measurement.neck_deep || ""}
                onChange={handleChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Back Blouse Deep</Field.Label>
              <Input
                name="back_blouse_deep"
                type="number"
                value={formData.customer_measurement.back_blouse_deep || ""}
                onChange={handleChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Shoulder</Field.Label>
              <Input
                name="shoulder"
                type="number"
                value={formData.customer_measurement.shoulder || ""}
                onChange={handleChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Yoke Length</Field.Label>
              <Input
                name="yoke_len"
                type="number"
                value={formData.customer_measurement.yoke_len || ""}
                onChange={handleChange}
              />
            </Field.Root>

            <h3>Upper Body Length</h3>
            <Box>
              <Field.Root marginBottom={3}>
                <Field.Label>Top Length</Field.Label>
                <Input
                  name="top_len"
                  type="number"
                  value={formData.customer_measurement.top_len || ""}
                  onChange={handleChange}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Blouse Length</Field.Label>
                <Input
                  name="blouse_len"
                  type="number"
                  value={formData.customer_measurement.blouse_len || ""}
                  onChange={handleChange}
                />
              </Field.Root>
            </Box>

            <h3>Lower Body Length</h3>
            <Box>
              <Field.Root marginBottom={3}>
                <Field.Label>Plazo Length</Field.Label>
                <Input
                  name="plazo_len"
                  type="number"
                  value={formData.customer_measurement.plazo_len || ""}
                  onChange={handleChange}
                />
              </Field.Root>

              <Field.Root marginBottom={3}>
                <Field.Label> Bellbottom Length</Field.Label>
                <Input
                  name="bellbottom_len"
                  type="number"
                  value={formData.customer_measurement.bellbottom_len || ""}
                  onChange={handleChange}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Pant Length</Field.Label>
                <Input
                  name="pant_len"
                  type="number"
                  value={formData.customer_measurement.pant_len || ""}
                  onChange={handleChange}
                />
              </Field.Root>
            </Box>

            <Field.Root>
              <Field.Label>Waist</Field.Label>
              <Input
                name="waist"
                type="number"
                value={formData.customer_measurement.waist || ""}
                onChange={handleChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Hip</Field.Label>
              <Input
                name="hip"
                type="number"
                value={formData.customer_measurement.hip || ""}
                onChange={handleChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Thigh</Field.Label>
              <Input
                name="thigh"
                type="number"
                value={formData.customer_measurement.thigh || ""}
                onChange={handleChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Knee</Field.Label>
              <Input
                name="knee"
                type="number"
                value={formData.customer_measurement.knee || ""}
                onChange={handleChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Armhole</Field.Label>
              <Input
                name="armhole"
                type="number"
                value={formData.customer_measurement.armhole || ""}
                onChange={handleChange}
              />
            </Field.Root>
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
