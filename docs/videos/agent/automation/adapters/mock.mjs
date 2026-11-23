/**
 * Deterministic adapter used to exercise the renderer and video pipeline
 * without a model key. It is not a substitute for a real recording.
 */
export async function run({ questions, slug }) {
  const events = [];

  for (const question of questions) {
    events.push({ type: "user", text: question.text });
    events.push({
      type: "assistant",
      text: "I'll use the indexed graph instead of guessing from file names. Let me pull the structural evidence first.",
    });
    events.push({
      type: "tool",
      name: "rgctl",
      input: {
        command: `rgctl -r . -f json blast-radius priceShoppingCart --depth 2`,
      },
      output: JSON.stringify(
        {
          schema_version: 2,
          command: "blast-radius",
          target: "priceShoppingCart",
          depth: 2,
          metrics: {
            score: 40.4,
            direct_callers_count: 4,
            impact_zone_size: 8,
          },
          callers: [
            "CartEndpoint.add",
            "CartEndpoint.update",
            "CartEndpoint.checkout",
            "ShoppingCartOrderProcessor.process",
          ],
        },
        null,
        2,
      ),
      status: "ok",
    });
    events.push({
      type: "assistant",
      text: `The graph shows four direct callers and an impact zone of eight symbols for ${slug}. I would treat the endpoints as external entry points, then verify the changed call paths before merging.`,
    });
  }

  return {
    events,
    meta: {
      agent: "mock",
      model: "mock",
      note: "Deterministic renderer test; not a model recording.",
    },
  };
}
