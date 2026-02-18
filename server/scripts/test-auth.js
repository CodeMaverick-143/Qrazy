
import prisma from "../src/config/prisma.js";
import bcrypt from "bcrypt";

const API_URL = "http://localhost:3000";
const TEST_EMAIL = "test-auth-" + Date.now() + "@example.com";

async function runTests() {
    console.log("Starting Auth Tests...");
    console.log(`Target API: ${API_URL}`);
    console.log(`Test Email: ${TEST_EMAIL}`);

    try {
        // --- Test 1: Request Magic Link ---
        console.log("\n--- Test 1: Request Magic Link ---");
        const reqResponse = await fetch(`${API_URL}/auth/magic-link/request`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: TEST_EMAIL }),
        });

        if (!reqResponse.ok) {
            const text = await reqResponse.text();
            throw new Error(`Request failed using url ${API_URL}/auth/magic-link/request: ${reqResponse.status} ${reqResponse.statusText} - ${text}`);
        }

        const reqData = await reqResponse.json();
        console.log("Response:", reqData);

        // Verify DB
        const magicLinkRecord = await prisma.magicLink.findFirst({
            where: { email: TEST_EMAIL },
            orderBy: { createdAt: "desc" },
        });

        if (!magicLinkRecord) {
            throw new Error("MagicLink record not created in DB");
        }
        console.log("✅ Magic Link Request Verification Passed: Record found in DB.");


        // --- Test 2: Verify Magic Link ---
        console.log("\n--- Test 2: Verify Magic Link ---");

        // We can't easily get the token sent in Test 1 without mocking mailer.
        // So we will insert a KNOWN token and verify that.
        const knownToken = "verification-test-token";
        const knownTokenHash = await bcrypt.hash(knownToken, 10);
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

        // Create User (Required for verifyLink to work, as it updates the user)
        await prisma.user.create({
            data: {
                email: TEST_EMAIL,
                name: "Test User",
            }
        });

        await prisma.magicLink.create({
            data: {
                email: TEST_EMAIL,
                tokenHash: knownTokenHash,
                expiresAt: expiresAt,
                used: false
            }
        });
        console.log("Inserted User and known token into DB.");

        // Call Verify Endpoint
        const verifyResponse = await fetch(`${API_URL}/auth/magic-link/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: TEST_EMAIL, token: knownToken }),
        });

        if (!verifyResponse.ok) {
            const text = await verifyResponse.text();
            throw new Error(`Verify failed: ${verifyResponse.status} ${verifyResponse.statusText} - ${text}`);
        }

        const verifyData = await verifyResponse.json();
        console.log("Response:", verifyData);

        // Check User Verification Status
        const user = await prisma.user.findUnique({ where: { email: TEST_EMAIL } });
        if (!user) throw new Error("User not found in DB");
        if (!user.isEmailVerified) throw new Error("User isEmailVerified is false");

        console.log("✅ Magic Link Verification Passed: User verified.");



        // --- Test 3: Login (Negative) ---
        console.log("\n--- Test 3: Login with Invalid Token ---");
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: "invalid-token" }),
        });

        // Expecting 500 because authService throws Error("Invalid token") and error middleware likely returns 500 for generic Error
        // Or maybe 400 if it's handled. Let's check status.
        if (loginResponse.ok) {
            throw new Error("Login with invalid token succeeded (should fail)");
        }
        console.log(`✅ Login failed as expected: ${loginResponse.status} ${loginResponse.statusText}`);


        // --- Test 4: Protected Route (Negative) ---
        console.log("\n--- Test 4: Protected Route (No Token) ---");
        const meResponse = await fetch(`${API_URL}/auth/me`, {
            method: "GET",
        });

        if (meResponse.ok) {
            throw new Error("Protected route accessed without token (should fail)");
        }
        console.log(`✅ Protected route failed as expected: ${meResponse.status} ${meResponse.statusText}`);

    } catch (error) {
        console.error("\n❌ Test Failed:", error);
        process.exit(1);
    } finally {
        // Cleanup
        console.log("\nCleaning up...");
        try {
            await prisma.magicLink.deleteMany({ where: { email: TEST_EMAIL } });
            await prisma.user.deleteMany({ where: { email: TEST_EMAIL } });
            console.log("Cleanup done.");
        } catch (cleanupError) {
            console.error("Cleanup failed:", cleanupError);
        }
        await prisma.$disconnect();
    }
}

runTests();
