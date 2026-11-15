import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ModeOnly } from '@/components/ui/ModeOnly';
import { ModeSwitch } from './ModeSwitch';

describe('ModeSwitch', () => {
  it('預設為學生模式，切換後更新狀態、儲存並影響 ModeOnly', async () => {
    const user = userEvent.setup();
    render(
      <>
        <ModeSwitch />
        <ModeOnly mode="teacher">教師內容</ModeOnly>
      </>,
    );

    const student = screen.getByRole('button', { name: '學生模式' });
    const teacher = screen.getByRole('button', { name: '教師模式' });
    expect(student).toHaveAttribute('aria-pressed', 'true');
    expect(teacher).toHaveAttribute('aria-pressed', 'false');
    expect(screen.queryByText('教師內容')).not.toBeInTheDocument();

    await user.click(teacher);
    expect(teacher).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('教師內容')).toBeInTheDocument();
    expect(window.localStorage.getItem('ail:mode:v1')).toBe('"teacher"');

    await user.click(student);
    expect(screen.queryByText('教師內容')).not.toBeInTheDocument();
  });
});
