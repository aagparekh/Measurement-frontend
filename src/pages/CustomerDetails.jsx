import {
  Box,
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Spinner,
  Text,
  Textarea,
  VStack,
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toaster } from "../components/ui/toaster.jsx";
// import { Dialogue } from "../components/ui/dialogue.jsx";

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState(customer);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCustomer = async () => {
    try {
      const res = await fetch(`${API_URL}/api/customer/${id}`);
      const data = await res.json();
      setCustomer(data);
      setFormData(data);
    } catch (err) {
      console.error("Error fetching customer:", err);
    }
  };
  useEffect(() => {
    fetchCustomer();
  }, [id]);

  if (!customer) {
    return (
      <VStack
        colorPalette="white"
        alignItems={"center"}
        justifyContent={"center"}
        minH={"100vh"}
      >
        <Spinner color={"white"} />
        <Text color="white">Loading...</Text>
      </VStack>
    );
  }
  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // console.log("first", name);
    // console.log("hello", formData);

    if (name === "customer_name") {
      // update top-level name
      setFormData((prev) => ({
        ...prev,
        customer_name: value,
      }));
    } else {
      // update nested measurements
      setFormData((prev) => ({
        ...prev,
        customer_measurement: {
          ...prev.customer_measurement,
          [name]: value,
        },
      }));
    }
  };

  // Handle Update Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("first");
    toaster.loading({
      id,
      title: "Updating customer",
      description: "Please wait...",
    });
    try {
      const res = await fetch(`${API_URL}/api/customer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");
      toaster.update(id, {
        title: "Hooray 🥳🥳🥳!!!",
        description: "Customer updated successfully",
        type: "success",
      });
      const updated = await res.json();
      setCustomer(updated);
      setIsDisabled(true);
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  // Share Whatsapp
  const shareOnWhatsApp = (customer) => {
    const { customer_name, customer_measurement } = customer;

    // Build measurement lines dynamically (skip 0, null, undefined, or "")
    const measurements = Object.entries(customer_measurement || {})
      .filter(([_, value]) => value && Number(value) !== 0) // keep only valid non-zero values
      .map(([key, value]) => {
        // Format key into readable label (replace _ with space, capitalize words)
        const label = key
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        return `- ${label}: ${value}`;
      })
      .join("\n");

    const message = `Customer Name: ${customer_name}
Measurements:
${measurements}`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/?text=${encodedMessage}`;
    window.open(url, "_blank"); // opens WhatsApp Web / App
  };

  const handleDelete = async () => {
    // toaster.success({ title: "Customer deleted successfully" });
    toaster.loading({
      id,
      title: "Deleting customer",
      description: "Please wait...",
    });
    try {
      const res = await fetch(`${API_URL}/api/customer/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toaster.update(id, {
          title: "Deleted!",
          description: "Customer deleted successfully",
          type: "success",
        });
        navigate("/search");
      } else {
        toaster.update(id, {
          title: "Failed",
          description: "Failed to delete customer",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <Box
      minW={"100vw"}
      alignItems={"center"}
      justifyContent={"center"}
      display={"flex"}
      //   borderWidth={"2px"}
      //   borderColor={"white"}
    >
      <Box
        maxW={"500px"}
        w={"90%"}
        // borderWidth={"2px"}
        // borderColor={"white"}
        p={2}
      >
        <Button onClick={() => setIsDisabled(!isDisabled)} margin={2}>
          Edit
        </Button>

        {/* <Button onClick={handleDelete}>Delete</Button> */}
        <Dialog.Root role="alertdialog" size={{ mdDown: "xs", md: "lg" }}>
          <Dialog.Trigger asChild>
            <Button>Delete</Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Are you sure?</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <p>
                    This action cannot be undone. This will permanently delete
                    the customer details.
                  </p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button colorPalette="red" onClick={handleDelete}>
                    Delete
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
        {/* <Dialogue onClick={handleDelete}></Dialogue> */}

        <Button
          colorPalette={"green"}
          onClick={() => shareOnWhatsApp(customer)}
          margin={2}
        >
          Share on WhatsApp
        </Button>
        <Fieldset.Root size="lg" disabled={isDisabled}>
          <Fieldset.Legend fontSize={"xl"}> Customer details</Fieldset.Legend>
          <Field.Root>
            <Field.Label>Customer Name</Field.Label>
            <Input
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
            />
          </Field.Root>
          <h2>Customer Measurement</h2>
          <Field.Root>
            <Field.Label>Chest</Field.Label>
            <Input
              name="chest"
              value={formData.customer_measurement.chest}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Upper Chest</Field.Label>
            <Input
              name="upper_chest"
              value={formData.customer_measurement.upper_chest}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Under Chest</Field.Label>
            <Input
              name="under_chest"
              value={formData.customer_measurement.under_chest}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Stomach</Field.Label>
            <Input
              name="stomach"
              value={formData.customer_measurement.stomach}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Dart Point</Field.Label>
            <Input
              name="dart_point"
              value={formData.customer_measurement.dart_point}
              onChange={handleChange}
            />
          </Field.Root>

          <h2>Sleeves Measurement</h2>
          <Box display={"flex"} gap={2}>
            <Field.Root>
              <Field.Label>sleeves length</Field.Label>
              <Input
                name="sleeves_len"
                value={formData.customer_measurement.sleeves_len}
                onChange={handleChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Upper Sleeves</Field.Label>
              <Input
                name="upper_sleeves"
                value={formData.customer_measurement.upper_sleeves}
                onChange={handleChange}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Lower Sleeves</Field.Label>
              <Input
                name="lower_sleeves"
                value={formData.customer_measurement.lower_sleeves}
                onChange={handleChange}
              />
            </Field.Root>
          </Box>

          <Field.Root>
            <Field.Label>Neck Deep</Field.Label>
            <Input
              name="neck_deep"
              value={formData.customer_measurement.neck_deep}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Blouse Back Deep</Field.Label>
            <Input
              name="blouse_back_deep"
              value={formData.customer_measurement.blouse_back_deep}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Shoulder</Field.Label>
            <Input
              name="shoulder"
              value={formData.customer_measurement.shoulder}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Yoke Length</Field.Label>
            <Input
              name="yoke_len"
              value={formData.customer_measurement.yoke_len}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>top length</Field.Label>
            <Input
              name="top_len"
              value={formData.customer_measurement.top_len}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Blouse length</Field.Label>
            <Input
              name="blouse_len"
              value={formData.customer_measurement.blouse_len}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>plazo len</Field.Label>
            <Input
              name="plazo_len"
              value={formData.customer_measurement.plazo_len}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Bellbottom len</Field.Label>
            <Input
              name="bellbottom_len"
              value={formData.customer_measurement.bellbottom_len}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Pant len</Field.Label>
            <Input
              name="pant_len"
              value={formData.customer_measurement.pant_len}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>waist</Field.Label>
            <Input
              name="waist"
              value={formData.customer_measurement.waist}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>hip</Field.Label>
            <Input
              name="hip"
              value={formData.customer_measurement.hip}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>thigh</Field.Label>
            <Input
              name="thigh"
              value={formData.customer_measurement.thigh}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>knee</Field.Label>
            <Input
              name="knee"
              value={formData.customer_measurement.knee}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>armhole</Field.Label>
            <Input
              name="armhole"
              value={formData.customer_measurement.armhole}
              onChange={handleChange}
            />
          </Field.Root>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </Fieldset.Root>
      </Box>
      <Toaster />
    </Box>
  );
};

export default CustomerDetails;
