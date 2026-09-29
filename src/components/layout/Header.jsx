import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Coins, User, Sparkles } from 'lucide-react';

export const Header = () => {
  const { currentRole, participant, researcher, setCurrentRole } = useApp();

  return (
    <header
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid var(--color-border)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '41px',
        zIndex: 100
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          onClick={() => setCurrentRole('public')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '16px',
              boxShadow: '0 2px 6px rgba(37,99,235,0.3)'
            }}
          >
            K
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '16px', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              KKU Survey <span style={{ color: 'var(--color-primary)', fontWeight: '500' }}>Marketplace</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Research Participant Platform
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: '#F1F5F9',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            color: '#475569',
            fontWeight: 500
          }}
        >
          <Sparkles size={11} color="#2563EB" /> KKU Innovation Prototype
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {currentRole === 'participant' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--color-primary-light)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-primary-subtle)',
                color: 'var(--color-primary-dark)',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              <Coins size={16} color="#2563EB" />
              <span>฿{participant.balance.toLocaleString()}</span>
              <span style={{ fontSize: '11px', fontWeight: '400', color: 'var(--color-text-muted)' }}>Balance</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569'
                }}
              >
                <User size={18} />
              </div>
              <div style={{ fontSize: '13px' }}>
                <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {participant.name}
                  <span className="badge badge-verified" style={{ padding: '1px 6px', fontSize: '10px' }}>
                    <ShieldCheck size={10} /> Verified
                  </span>
                </div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>
                  {participant.faculty}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentRole === 'researcher' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#ECFDF5',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #A7F3D0',
                color: '#065F46',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              <Coins size={16} color="#059669" />
              <span>฿{researcher.balance.toLocaleString()}</span>
              <span style={{ fontSize: '11px', fontWeight: '400', color: '#047857' }}>Research Budget</span>
            </div>

            <div style={{ fontSize: '13px', textAlign: 'right' }}>
              <div style={{ fontWeight: '600' }}>{researcher.name}</div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>{researcher.department}</div>
            </div>
          </div>
        )}

        {currentRole === 'admin' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-active" style={{ background: '#FEF3C7', color: '#92400E' }}>
              <ShieldCheck size={12} /> Platform Administrator
            </span>
          </div>
        )}
      </div>
    </header>
  );
};
