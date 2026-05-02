# Pet Family App Design System

Reference image: soft mobile onboarding and account flow for a pet-care/family app. The system combines clean form usability with playful hand-drawn pet illustrations, coral-pink headers, white cards, and gentle rounded surfaces.

## 1. Design Direction

### Friendly first
The app should feel like welcoming a pet into a family. Use warm copy, soft corners, simple progress cues, and approachable illustrations.

### Forms stay calm
Most screens are onboarding, login, sign-up, and pet profile forms. Keep inputs clear, generous, and predictable. Decoration should live in headers, empty spaces, and success states, not inside dense form areas.

### Playful but polished
Illustrations can be whimsical, but UI controls should remain crisp: thin borders, readable labels, stable spacing, and clear active states.

## 2. Color Tokens

### Core Palette

| Token | Hex | Use |
| --- | --- | --- |
| `--color-pink-50` | `#FFF1F5` | Very soft pink wash |
| `--color-pink-100` | `#FFD6DF` | Secondary pink background |
| `--color-pink-300` | `#FF8DA3` | Header gradient light stop |
| `--color-pink-500` | `#FF5F83` | Primary CTA, selected states |
| `--color-pink-600` | `#F04B72` | Pressed CTA, focus accent |
| `--color-mint-50` | `#EFFBFA` | Illustration sky/water wash |
| `--color-mint-100` | `#D9F4F1` | Soft illustration background blobs |
| `--color-sand-50` | `#FFF9F1` | Warm success-screen base |
| `--color-sand-200` | `#E9DFA7` | Decorative ground/wave |
| `--color-white` | `#FFFFFF` | Cards, sheets, form fields |
| `--color-gray-50` | `#F8F8F8` | App canvas |
| `--color-gray-100` | `#F1F1F1` | Input fill, dividers |
| `--color-gray-300` | `#D8D8D8` | Default borders |
| `--color-gray-500` | `#9C9C9C` | Helper text |
| `--color-gray-700` | `#555555` | Body text |
| `--color-charcoal` | `#303030` | Headings |
| `--color-error` | `#E95B75` | Error border and message |

### Semantic Tokens

| Token | Value |
| --- | --- |
| `--surface-app` | `var(--color-gray-50)` |
| `--surface-card` | `var(--color-white)` |
| `--surface-field` | `var(--color-white)` |
| `--surface-soft` | `var(--color-pink-50)` |
| `--text-primary` | `var(--color-charcoal)` |
| `--text-secondary` | `var(--color-gray-500)` |
| `--text-body` | `var(--color-gray-700)` |
| `--border-default` | `var(--color-gray-300)` |
| `--border-active` | `var(--color-pink-500)` |
| `--accent-primary` | `var(--color-pink-500)` |
| `--accent-primary-pressed` | `var(--color-pink-600)` |
| `--accent-illustration` | `var(--color-mint-100)` |

### Usage Ratio

- 60% white cards and form fields
- 18% light gray app background and dividers
- 14% coral pink for headers, CTAs, selected chips, and progress
- 6% mint/sand illustration washes
- 2% dark text and outline details

Avoid heavy dark backgrounds, neon colors, and large saturated gradients outside the top header.

## 3. Gradients

Use gradients only for the rounded top header panels.

```css
--gradient-header: linear-gradient(135deg, #ff8da3 0%, #ff6f8f 52%, #ff5f83 100%);
```

Header decoration can include subtle vertical strings, tiny hearts, stars, and dots at low opacity. Keep them ornamental and non-interactive.

## 4. Typography

### Recommended Fonts

| Role | Font | Weight |
| --- | --- | --- |
| Korean UI | `Pretendard` | 400-700 |
| Friendly Latin fallback | `Nunito` | 400-700 |
| System fallback | `Arial`, sans-serif | 400-700 |

### Type Scale

| Token | Size / Line height | Use |
| --- | --- | --- |
| `--font-size-xs` | `10px / 14px` | Helper text, tiny links |
| `--font-size-sm` | `12px / 18px` | Labels, captions, secondary copy |
| `--font-size-md` | `14px / 22px` | Input text, body copy |
| `--font-size-lg` | `20px / 28px` | Card titles |
| `--font-size-xl` | `24px / 32px` | Auth header titles |
| `--font-size-2xl` | `28px / 36px` | Welcome and completion titles |

Rules:

- Use `600-700` for titles and primary actions.
- Keep labels small and calm, but never below `10px`.
- Letter spacing stays `0`.
- Use `--color-charcoal` instead of pure black.

## 5. Spacing

Base unit: `4px`.

| Token | Value | Use |
| --- | --- | --- |
| `--space-1` | `4px` | Icon gaps, tiny decoration offsets |
| `--space-2` | `8px` | Label to field gap |
| `--space-3` | `12px` | Button groups, field groups |
| `--space-4` | `16px` | Card inner spacing |
| `--space-5` | `20px` | Form section spacing |
| `--space-6` | `24px` | Screen horizontal padding |
| `--space-8` | `32px` | Major section gap |
| `--space-10` | `40px` | Large illustration gap |

Mobile forms should use `24px` side padding and `12-16px` gaps between fields.

## 6. Radius, Borders, Shadows

| Token | Value | Use |
| --- | --- | --- |
| `--radius-xs` | `4px` | Inputs, small chips |
| `--radius-sm` | `8px` | Buttons, field containers |
| `--radius-md` | `14px` | Cards, image upload areas |
| `--radius-lg` | `20px` | Phone screen cards, bottom sheets |
| `--radius-pill` | `999px` | Circular icon buttons, round CTAs |
| `--border-hairline` | `1px solid var(--border-default)` | Inputs, dividers |
| `--shadow-card` | `0 12px 28px rgba(48, 48, 48, 0.12)` | Floating auth cards |
| `--shadow-soft` | `0 6px 16px rgba(48, 48, 48, 0.08)` | Small raised elements |

Use soft shadows on cards that float over the background. Inputs should rely on borders more than shadows.

## 7. Layout System

### Mobile Frame

- Reference width: `320-375px`
- Screen background: `--surface-app`
- Card width: full screen minus `32-48px`
- Auth and onboarding cards use large vertical composition with illustration first.
- Form sheets may overlap the header by `24-40px`.

### Auth Screen Structure

1. Pink illustrated header
2. White rounded form card overlapping header
3. Input stack
4. Primary CTA
5. Divider with social login
6. Account switch link

### Pet Setup Screen Structure

1. Pink title header
2. White form card
3. Pet image or upload area
4. Choice controls and inputs
5. Bottom progress dots
6. Previous / Next text buttons

### Completion Screen Structure

1. Large family or pet illustration
2. Completion title
3. Short welcome copy
4. Large circular next CTA
5. Small decorative ground illustration

## 8. Components

### Primary Button

Use for sign up, continue, yes, save, and next.

- Height: `44px`
- Radius: `4-6px`
- Fill: `--accent-primary`
- Text: white, `12-14px`, `700`
- Shadow: none by default
- Pressed: `--accent-primary-pressed`, `translateY(1px)`
- Disabled: `#F5B5C3` with white text at `0.8` opacity

### Secondary Button

Use for log in, no, previous, and low-emphasis actions.

- Height: `40-44px`
- Fill: `--color-white`
- Border: `1px solid var(--accent-primary)`
- Text: `--accent-primary`
- Radius: `4-6px`

### Circular Action Button

Use for final step navigation and add-photo/add-condition actions.

- Size: `54-64px` for primary circular CTA
- Size: `28-40px` for add/remove controls
- Fill: `--accent-primary`
- Icon: white, centered
- Radius: pill

### Text Field

- Height: `42-48px`
- Background: `--surface-field`
- Border: `1px solid #DDDDDD`
- Radius: `4px`
- Padding: `0 12px`
- Label: `10-12px`, `--text-secondary`
- Text: `13-14px`, `--text-primary`
- Focus: `--border-active`, optional `0 0 0 3px rgba(255, 95, 131, 0.12)`
- Error: `--color-error` border and helper text

### Password Field

Same as text field with a trailing visibility icon button. The icon should be gray by default and pink on hover/focus.

### Radio and Segmented Choices

Use for account type, gender, spayed/neutered, and pet category.

- Selected fill: `--accent-primary`
- Selected text/icon: white
- Default fill: white
- Default border: `#D8D8D8`
- Circular category buttons: `44-52px`
- Label under icon: `10-12px`

### Social Login Button

- Size: `32-36px`
- Shape: circular
- Border: `1px solid #D8D8D8`
- Fill: white
- Use official brand color only in the icon, not in the button fill.

### Divider

Use centered copy such as `or continue with`.

- Line: `1px #E6E6E6`
- Text: `10-12px`, `--text-secondary`
- Gap around text: `12px`

### Progress Dots

- Dot size: `4-5px`
- Active width: `14-18px`
- Active color: `--accent-primary`
- Inactive color: `#E6C8D0`
- Position: bottom center of setup cards

### Image Upload Area

- Aspect ratio: `4 / 3`
- Fill: `#F3F3F3`
- Radius: `4px`
- Placeholder illustration: low-contrast gray
- Add button: pink circular button at bottom-right

### Medical Concern Chips

- Shape: circular icon chip with short label below
- Selected fill: `--accent-primary`
- Default border: pink outline
- Use simple icons for skin, tone, dental, and add.

## 9. Iconography

Use line icons with rounded caps and simple filled states.

Recommended icon style:

- Stroke: `1.5-2px`
- Default color: `--color-gray-500`
- Active color: white on pink fill or `--accent-primary` on white
- Avoid complex detail inside small buttons.

Core icons: arrow-right, plus, eye, calendar, dog, cat, bird, fish, paw, tooth, skin/hand, social logos.

## 10. Illustration Style

Illustrations are the emotional signature of the app.

Rules:

- Use soft blob backgrounds in mint, pale blue, or sand.
- Characters and pets should have rounded shapes, simple facial expressions, and warm body language.
- Use flat fills, minimal shading, and hand-drawn details.
- Keep outlines sparse and soft, not heavy comic strokes.
- Header illustrations can peek over the white form card.
- Success illustrations can take `45-55%` of the screen height.

Good motifs: pets with owners, pet toys, tiny houses, birds, stars, hearts, ropes, flags, soft waves, small plants.

Avoid: photographic pets, sharp geometric mascots, glossy 3D assets, dense background scenes, dark overlays.

## 11. Motion

Motion should feel soft and quick.

| Interaction | Motion |
| --- | --- |
| Button press | `translateY(1px)`, 120ms |
| Field focus | Border and ring fade, 120ms |
| Step transition | Fade + 8px horizontal movement, 180ms |
| Progress dot change | Width expansion, 160ms |
| Add photo | Scale `0.96 -> 1`, 140ms |
| Completion CTA | Gentle scale on press, 120ms |

Use easing:

```css
--ease-soft: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## 12. Content Voice

Tone: caring, short, and lightly playful.

Good Korean examples:

- `환영해요!`
- `반려동물 프로필을 만들어볼까요?`
- `가장 예쁜 사진을 올려주세요`
- `거의 다 왔어요`
- `우리 가족이 되었어요`

Good English examples:

- `Welcome aboard!`
- `Add a New Pet`
- `Almost Done!`
- `All Set`
- `Welcome to the family`

Avoid:

- Long onboarding explanations
- Medical promises or diagnosis language
- Excessive cuteness in every label
- Dense paragraphs inside forms

## 13. Accessibility

- Minimum touch target: `44px` for primary controls, `36px` for compact icon buttons.
- Text and input borders must meet contrast expectations on white and gray backgrounds.
- Do not rely on pink alone for state. Pair color with checkmarks, borders, labels, or `aria-pressed`.
- Inputs need visible labels, not placeholder-only labels.
- Password visibility buttons need accessible names.
- Social login buttons need provider names.
- Progress dots should expose the current step text to screen readers.

## 14. CSS Starter

```css
:root {
  color-scheme: light;

  --color-pink-50: #fff1f5;
  --color-pink-100: #ffd6df;
  --color-pink-300: #ff8da3;
  --color-pink-500: #ff5f83;
  --color-pink-600: #f04b72;
  --color-mint-50: #effbfa;
  --color-mint-100: #d9f4f1;
  --color-sand-50: #fff9f1;
  --color-sand-200: #e9dfa7;
  --color-white: #ffffff;
  --color-gray-50: #f8f8f8;
  --color-gray-100: #f1f1f1;
  --color-gray-300: #d8d8d8;
  --color-gray-500: #9c9c9c;
  --color-gray-700: #555555;
  --color-charcoal: #303030;
  --color-error: #e95b75;

  --surface-app: var(--color-gray-50);
  --surface-card: var(--color-white);
  --surface-field: var(--color-white);
  --surface-soft: var(--color-pink-50);
  --text-primary: var(--color-charcoal);
  --text-secondary: var(--color-gray-500);
  --text-body: var(--color-gray-700);
  --border-default: var(--color-gray-300);
  --border-active: var(--color-pink-500);
  --accent-primary: var(--color-pink-500);
  --accent-primary-pressed: var(--color-pink-600);
  --gradient-header: linear-gradient(135deg, #ff8da3 0%, #ff6f8f 52%, #ff5f83 100%);

  --font-body: "Pretendard", "Nunito", Arial, sans-serif;
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-pill: 999px;
  --shadow-card: 0 12px 28px rgba(48, 48, 48, 0.12);
  --ease-soft: cubic-bezier(0.2, 0.8, 0.2, 1);
}
```
