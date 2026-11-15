import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import type { Challenge } from '@/content/types';
import { ChallengePanel } from './ChallengePanel';

const challenge: Challenge = {
  id: 'demo',
  prompt: '哪一個對？',
  options: [
    { id: 'a', label: '選項 A', isCorrect: false, feedback: '再想想 A' },
    { id: 'b', label: '選項 B', isCorrect: true, feedback: '答對了 B' },
  ],
};

describe('ChallengePanel', () => {
  it('作答前不顯示回饋；作答後立即顯示，並可改選', async () => {
    const user = userEvent.setup();
    render(<ChallengePanel challenge={challenge} />);

    expect(screen.getByRole('radiogroup', { name: '哪一個對？' })).toBeInTheDocument();
    expect(screen.queryByTestId('challenge-feedback')).not.toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: '選項 A' }));
    expect(screen.getByTestId('challenge-feedback')).toHaveTextContent('再想想 A');
    expect(screen.getByTestId('challenge-feedback')).toHaveAttribute('data-correct', 'false');

    await user.click(screen.getByRole('radio', { name: '選項 B' }));
    expect(screen.getByTestId('challenge-feedback')).toHaveTextContent('答對了 B');
    expect(screen.getByTestId('challenge-feedback')).toHaveAttribute('data-correct', 'true');
  });
});
