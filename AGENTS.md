<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep TanStack Start routing; reproduce documented OmniGym URLs with file routes, retaining previous URLs as compatibility screens to avoid breaking existing navigation.
- Centralize OmniGym shell navigation and use semantic dark tokens; shared shells keep role-specific mobile and desktop behavior consistent.
- Treat the uploaded canonical entity dictionary as the demo data boundary; do not infer missing nested JSON forms or validation rules without the module specifications.

- Keep canonical contracts, entity fixtures and shared in-memory stores in `src/lib/omnigym` and screen implementations in `src/components/omnigym`; route wrappers stay small so compatibility URLs share the same behavior.
- Exercise only frontend demo session and payment state until real services are explicitly requested; unverified financial formulas and nested JSON schemas must remain unimplemented.
- Keep browser-only rich text initialization deferred with SSR-safe Tiptap configuration; rich content fields share one editor rather than per-page parsing.
