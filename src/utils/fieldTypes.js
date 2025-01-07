import {
    Type,
    Hash,
    CheckSquare,
    List,
    CircleDot,
    Send,
    RotateCcw,
    X,
} from 'lucide-react';

export const fieldTypes = [
    { type: 'text', icon: Type, label: 'Text' },
    { type: 'label', icon: Type, label: 'label' },
    { type: 'number', icon: Hash, label: 'Number' },
    { type: 'checkbox', icon: CheckSquare, label: 'Checkbox' },
    { type: 'select', icon: List, label: 'Select' },
    { type: 'radio', icon: CircleDot, label: 'Radio' },
    // Button Types
    { type: 'submit', icon: Send, label: 'Submit Button' },
    { type: 'reset', icon: RotateCcw, label: 'Reset Button' },
    { type: 'cancel', icon: X, label: 'Cancel Button' },
    { type: 'clear', icon: X, label: 'Clear Button' },
];