import React, { useState, useEffect } from "react";
import microsoft from "../assets/Icons/Microsoft.png";
import {
    Button,
    Divider,
    FileInput,
    NumberInput,
    Textarea,
    TextInput,
    Modal,
    Notification,
} from "@mantine/core";
import { IconAt, IconFileCv, IconCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface FormData {
    name: string;
    email: string;
    phone: string | number | undefined;
    portfolio: string;
    about: string;
    cv: File | null;
}

const ApplyJobComp = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: undefined,
        portfolio: "",
        about: "",
        cv: null,
    });

    const [opened, setOpened] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);
    const navigate = useNavigate();

    // Countdown effect
    useEffect(() => {
        if (countdown === null) return;
        if (countdown === 0) {
            navigate("/find-jobs");
            return;
        }
        const timer = setTimeout(
            () => setCountdown((c) => (c !== null ? c - 1 : null)),
            1000
        );
        return () => clearTimeout(timer);
    }, [countdown, navigate]);

    const handleApply = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (
            !formData.name ||
            !formData.email ||
            !formData.cv ||
            !formData.about ||
            !formData.portfolio
        ) {
            toast.error("Please fill all the required fields.");
            return;
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        setOpened(false);
        setShowNotification(true);
        setCountdown(5);
    };

    return (
        <div className="w-full max-w-3xl p-6 mx-auto relative">
            {/* Notification at top */}
            {showNotification && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg">
                    <Notification
                        icon={<IconCheck size={20} />}
                        color="teal"
                        title="Application Sent ✅"
                        withCloseButton={false}
                    >
                        Redirecting to jobs page in {countdown}s...
                    </Notification>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex gap-4">
                    <div className="p-4 bg-mine-shaft-800 rounded-xl flex items-center justify-center">
                        <img
                            src={microsoft}
                            className="h-14 w-14 object-contain"
                            alt="Company logo"
                        />
                    </div>
                    <div>
                        <div className="font-semibold text-2xl text-white">
                            Software Engineer
                        </div>
                        <div className="text-sm text-mine-shaft-300 mt-1">
                            Google •{" "}
                            <span className="text-bright-sun-400">120 Applicants</span>
                        </div>
                    </div>
                </div>
            </div>

            <Divider size="xs" my="xl" />

            {/* Form Title */}
            <div className="text-xl font-semibold mb-5">
                Complete the form below to apply for this job.
            </div>

            {/* Form */}
            <div className="flex flex-col gap-5 [&>*]:w-full">
                <div className="flex flex-col md:flex-row gap-5 [&>*]:w-full md:[&>*]:w-1/2">
                    <TextInput
                        label="Full Name"
                        withAsterisk
                        placeholder="Enter your Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.currentTarget.value })
                        }
                    />
                    <TextInput
                        label="Email"
                        withAsterisk
                        placeholder="Enter your email"
                        leftSection={<IconAt />}
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.currentTarget.value })
                        }
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5 [&>*]:w-full md:[&>*]:w-1/2">
                    <NumberInput
                        hideControls
                        label="Phone"
                        withAsterisk
                        placeholder="Enter your Number"
                        min={0}
                        value={formData.phone}
                        onChange={(val) => setFormData({ ...formData, phone: val })}
                    />
                    <TextInput
                        label="Portfolio"
                        withAsterisk
                        placeholder="Portfolio link"
                        value={formData.portfolio}
                        onChange={(e) =>
                            setFormData({ ...formData, portfolio: e.currentTarget.value })
                        }
                    />
                </div>

                <FileInput
                    leftSection={<IconFileCv size={16} />}
                    label="Attach your CV"
                    placeholder="Your CV"
                    leftSectionPointerEvents="none"
                    withAsterisk
                    value={formData.cv}
                    onChange={(file) => setFormData({ ...formData, cv: file ?? null })}
                />

                <Textarea
                    placeholder="Briefly introduce yourself..."
                    label="About You"
                    withAsterisk
                    minRows={4}
                    autosize
                    value={formData.about}
                    onChange={(e) =>
                        setFormData({ ...formData, about: e.currentTarget.value })
                    }
                />

                <div className="flex justify-end">
                    <Button
                        variant="light"
                        className="!text-sm !text-mine-shaft-300 !border-mine-shaft-700 
                       hover:!bg-mine-shaft-800 hover:!border-bright-sun-400 
                       hover:!text-bright-sun-400 transition-colors duration-300"
                        onClick={() => setOpened(true)}
                    >
                        Preview
                    </Button>
                </div>
            </div>

            {/* Preview Modal */}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                centered
                overlayProps={{
                    blur: 6,
                    opacity: 0.55,
                }}
                classNames={{
                    body: "bg-mine-shaft-900 text-white p-6 rounded-2xl shadow-xl",
                }}
                withCloseButton={false}
                size="lg"
            >
                <h2 className="text-2xl font-semibold mb-4">Application Preview</h2>
                <p>
                    <span className="font-semibold">Full Name:</span>{" "}
                    {formData.name || "—"}
                </p>
                <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {formData.email || "—"}
                </p>
                <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {formData.phone || "—"}
                </p>
                <p>
                    <span className="font-semibold">Portfolio:</span>{" "}
                    {formData.portfolio || "—"}
                </p>
                <p>
                    <span className="font-semibold">About You:</span>{" "}
                    {formData.about || "—"}
                </p>
                <p>
                    <span className="font-semibold">CV:</span>{" "}
                    {formData.cv ? formData.cv.name : "—"}
                </p>

                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => setOpened(false)}
                        className="!text-sm !text-gray-300 !border-gray-500 hover:!bg-mine-shaft-800"
                    >
                        Close
                    </Button>
                    <Button
                        variant="filled"
                        className="!text-sm !bg-bright-sun-400 !text-black hover:!bg-bright-sun-500"
                        onClick={handleApply}
                    >
                        Apply
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default ApplyJobComp;
