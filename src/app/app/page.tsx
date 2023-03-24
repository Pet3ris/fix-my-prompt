"use client";

import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "../page.module.css";
import { Box, Textarea, Input, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import React, { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  return (
    <main>
      <div className={styles.topnav}>
        <div className={styles.logoContainer}>
          <img
            src="./logo.small.white.svg"
            alt="Logo"
            className={styles.logo}
          />
        </div>
        <div className={styles.apiKeyContainer}>
        <FormControl display="flex" alignItems="center" justifyContent="center">
          <Input
            type={showApiKey ? "text" : "password"}
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Insert OpenAI API key"
            bg="gray.700"
            borderColor="gray.500"
            color="white"
            _hover={{ borderColor: "gray.600" }}
            _focus={{ borderColor: "gray.600", boxShadow: "none" }}
            mr="1rem"
          />
          <FormLabel htmlFor="show-api-key" mb="0" color="white" fontSize="sm" className={styles.showApiKeySwitch}>
            Show API Key
          </FormLabel>
          <Switch id="show-api-key" colorScheme="blue" onChange={toggleShowApiKey} />
        </FormControl>
      </div>
      </div>
      <div className={styles.app}>
        <Box mt="20">
          <Textarea
            id="prompt"
            placeholder="Enter your prompt here"
            size="lg"
            resize="none"
            h="9rem"
            w="50%"
            overflowY="scroll"
            color="white"
            bg="gray.700"
            borderColor="gray.500"
            _hover={{ borderColor: "gray.600" }}
            _focus={{ borderColor: "gray.600", boxShadow: "none" }}
          />
        </Box>
        <div className={styles.buttonContainer}>
          <div className={styles.button}>Fix My Prompt</div>
        </div>
      </div>
    </main>
  );
}
