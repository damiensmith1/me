---
title: Tests that survive prompt edits
date: 2026-10-08
summary: Why I built llm-cassette, and how a judge model keeps recorded LLM responses useful after you change a prompt.
draft: true
---

<!-- DRAFT: written from the llm-cassette README. Rewrite in your own voice,
add the story of what made you build it, then delete `draft: true`. -->

Testing code that calls an LLM has two bad defaults. Call the real API on
every run and your tests are slow, flaky, and cost money. Mock the responses
and you're testing your mocks.

The usual middle ground is a cassette: record the real response once, then
replay it from a file. That works until you edit a prompt. Change one word
and the request no longer matches the recording, so every test that touches
that prompt breaks, even when the saved answer would still be fine.

## Asking a judge instead of matching strings

[llm-cassette](https://github.com/damiensmith1/llm-cassette) adds one step.
When a request doesn't match a recording exactly, it checks, cheapest first:

1. **Exact:** the same request.
2. **Scrubbed:** the same apart from timestamps, UUIDs and caller fields.
3. **Hard checks:** a changed model, setting, output format, tool schema or
   image always re-records.
4. **Judge:** only the prompt text changed, so a judge model decides whether
   the saved response still answers the new prompt.

If the judge says the response still fits, the cassette is kept. If not,
that one call is re-recorded.

## Keeping CI deterministic

A judge is a model, and models aren't deterministic. So the judge only runs
while recording. Its verdict is written into the cassette next to the
response, and replay reads the saved verdict. CI never calls a model and
never needs an API key.

The reporter shows what happened on each run:

```
llm-cassette: 38 exact, 4 judged, 1 recorded
  summarizes (test/summary.test.ts)
    judged p=0.96: POST /v1/messages
    recorded: POST /v1/messages — judge says the recording no longer fits (p=0.04 < 0.85)
```

## No changes to app code

Calls to OpenAI, Anthropic and OpenRouter are intercepted at the network
layer, so the code under test doesn't change. Each test gets its own cassette
in `__cassettes__/` next to the test file, and you commit them like
snapshots.

```ts
import { test } from "@damiensmith1/llm-cassette/vitest";

test("classifies receipts", async () => {
  expect(await classify("Your order has shipped")).toBe("receipts");
});
```

## What I learned

<!-- Add two or three things you learned building it. -->
