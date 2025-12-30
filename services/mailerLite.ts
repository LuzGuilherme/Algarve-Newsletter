
const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNjQyOWIxNGQ5OWQzNTE5MTE2OTQ0OTMzODkzZGQ3ZTc0NjQ5ZGM5ZWY1YmUwNzczZTg4YmIzN2YyZDc4MWMyZjQyZTUzYzRhMWM4OGU2MmQiLCJpYXQiOjE3NjcxMTI0MzcuODgyNjM4LCJuYmYiOjE3NjcxMTI0MzcuODgyNjQsImV4cCI6NDkyMjc4NjAzNy44Nzg1MjMsInN1YiI6IjIwMjY2NjgiLCJzY29wZXMiOltdfQ.LQU7d6OrihbIOd43xIN7UbOJjLm-qrEIRWKwJvfJXamhHSr5J2mUmoILtmChZCScPT9ieuFCYynWkBhC-r0BHnRkaITfjwqoavoLTWxBij42a-D6_Ha_VPWqWCCDNhBdsIjzC6TOpFd-XX7cp86W6m0ENJaXGU3Bd935bOdUpQKZe1MWEH7LUN_w2HBWODlPPJ9T-z3DmIWafrISVz2KflfEHYuqkaMC4JlOANvLdXJtfQLBt7BRGQMPqW4wz2YnB7clXd95XQQfndHcIMn1_QiFBdSklVUdrbpO6e2C90UK9U6IY6qCTYsTFqU1GZ7QVW1G5JOY3v-qWGPRiSNGdhmEs0RQOvS3wyYb7ZUQewTtCr5SKqqiLeSU11x2lRINx_ktNLvI5XHUrLGtiA82p7O9lIqtNYi4XOFV289CEoKuuPVgQBKgcGAbTIhIyFIhdMvATMv_ILM-4iNDIibYp07tFn0RGEZ3yWfzvJtKCz7vASMWuzP8x2LMM_D86fBqQA3WyOclz6oUXtJ5VFF1oZ9GbExO4VzA3dOVMsSMSk75SC2KTqq8DLQU6ldDVr4ztkzs3zgX18uhlPm8hhV6VgqgIdAZWRh54P4jRlMUoxGnWPc4e0dISFbykLMda9ni5_HteUjGYYjQxA1VGmBDsaQpUdrJKrzRGtmVYIoRSek";
const GROUP_ID = "175229915165099212";

export const subscribeToNewsletter = async (email: string): Promise<void> => {
    const url = 'https://connect.mailerlite.com/api/subscribers';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            email: email,
            groups: [GROUP_ID]
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('MailerLite subscription error:', errorData);
        throw new Error(errorData.message || 'Failed to subscribe to newsletter');
    }
};
