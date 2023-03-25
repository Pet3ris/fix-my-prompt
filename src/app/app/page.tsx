"use client";

import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "../page.module.css";
import {
  Box,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  Switch,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const inter = Inter({ subsets: ["latin"] });

interface OpenAIState {
  openai: OpenAIApi | null;
}

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [openaiAnswer, setOpenaiAnswer] = useState("");
  const [openai, setOpenai] = useState<OpenAIState>({ openai: null });

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    const configuration = new Configuration({
      apiKey: e.target.value,
    });
    setOpenai({ openai: new OpenAIApi(configuration) });
  };

  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleFixPrompt = async () => {
    setLoading(true);

    try {
      if (openai.openai) {
        const response = await openai.openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a world class prompt engineer",
            },
            {
              role: "user",
              content: `You are a world class ChatGPT prompt engineer. Consider the following prompt:

              ###FIXMYPROMPT###
              ${prompt}
              ###FIXMYPROMPT###
              
              Consider the following framework for what constitutes a good prompt:
              
              Intent: Specify your input and ideal outcome
              - Is the intent stated and clear?
              - Is the output clearly constrained (e.g., length / format)?
              - Are unbiased example outputs provided?
              
              Clarity: Use language that facilitates understanding
              - Is simple language used?
              - Is the prompt clear?
              - Is the prompt direct (no don'ts)?
              - Is grammar and spelling correct?
              
              Style: Control the flavor of the answer
              - Has a role/persona been provided for the prompt?
              - Have tags/parameters been provided (for example, #formal or #informal)?
              
              Tactics: Guide the reasoning process
              - Is the prompt too complex/long?
              - Are there reasoning instructions provided?
              - Does it need a useful metaprompt?
              
              Using this framework, score the quality of the prompt and respond as follows:
              
              Overall Prompt Quality: <Insert score from 0-100>
              
              Intent: <insert score from 0-100>
              - <provide recommendations to improve intent>
              
              Clarity: <insert score from 0-100>
              - <provide recommendations to improve clarity>
              
              Style: <insert score from 0-100>
              - <provide recommendations to improve style>
              
              Tactics: <insert score from 0-100>
              - <provide recommendations to improve tactics>
            
              Finally, please provide these recommendations in a positive form,
              for example say: "Consider providing explicit reasoning instructions"
              rather than "Reasoning instructions are not provided".`,
            },
          ],
        });

        console.log("response:");
        console.log(response);

        // @ts-ignore
        setOpenaiAnswer(response.data.choices[0].message.content);
      }
    } catch (error) {
      console.log("error:");
      console.log(error);

      // @ts-ignore
      setOpenaiAnswer(error.response.data.error.message);
    }

    setLoading(false);
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
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
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
            <FormLabel
              htmlFor="show-api-key"
              mb="0"
              color="white"
              fontSize="sm"
              className={styles.showApiKeySwitch}
            >
              Show API Key
            </FormLabel>
            <Switch
              id="show-api-key"
              colorScheme="blue"
              onChange={toggleShowApiKey}
            />
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
            value={prompt}
            // @ts-ignore
            onChange={handlePromptChange}
          />
        </Box>
        <div className={styles.buttonContainer}>
          <div className={styles.button} onClick={handleFixPrompt}>
            Fix My Prompt
          </div>
        </div>
        <Box mt="20" display="flex" justifyContent="center">
          {loading ? (
            <Spinner />
          ) : (
            <Text
              color="white"
              maxW="50%"
              textAlign="left"
              whiteSpace="pre-wrap"
              className={styles.answer}
            >
              {openaiAnswer}
            </Text>
          )}
        </Box>
      </div>
    </main>
  );
}
