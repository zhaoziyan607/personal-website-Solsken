import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Copy, Download, Hash, Mail, MessageCircle, Send } from 'lucide-react';
import { CONTACT } from '@/data/content';
import { submitVisitorMessage } from '@/services/messageApi';
import { Spread } from '@/components/layout/Spread';

type ToastState = {
  id: number;
  message: string;
};

export function ContactSpread() {
  const [content, setContent] = useState('');
  const [toast, setToast] = useState<ToastState | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function showToast(message: string) {
    setToast({ id: Date.now(), message });
  }

  async function copyValue(value: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      window.prompt('复制这段联系方式', value);
    }
    showToast('已复制到剪贴板。');
  }

  async function submitMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    const result = await submitVisitorMessage(trimmed);
    setSubmitting(false);

    if (result.ok) {
      setContent('');
      setSubmitted(true);
    } else if (result.error === 'not_configured') {
      showToast('留言功能部署前需配置数据库，本地环境暂不可用。');
    } else {
      showToast('发送失败，请直接发邮件给我。');
    }
  }

  return (
    <Spread id="contact">
      {toast &&
        createPortal(
          <div
            key={toast.id}
            className="toast-pop contact-toast border border-gold/30 bg-void/95 px-4 py-2 text-sm text-gold shadow-[0_0_30px_rgba(213,181,111,0.18)]"
          >
            {toast.message}
          </div>,
          document.body,
        )}

      <div className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">

        {/* 左侧：联系方式 */}
        <div className="min-w-0">
          <p className="chapter-label mb-4">Contact / CoffeeChat</p>
          <h2 className="spread-title mb-4 text-3xl md:text-5xl">联系我</h2>
          <p className="body-copy text-muted">{CONTACT.closing}</p>

          <div className="mt-8 grid min-w-0 gap-3">
            <button
              type="button"
              onClick={() => copyValue(CONTACT.email)}
              className="map-card flex min-w-0 items-center justify-between gap-4 text-left transition hover:border-gold/45"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Mail size={18} className="shrink-0 text-gold" />
                <span className="min-w-0">
                  <span className="caption-copy block">邮箱</span>
                  <span className="block break-all text-sm font-medium md:text-base">{CONTACT.email}</span>
                </span>
              </span>
              <Copy size={15} className="shrink-0 text-muted" />
            </button>

            <button
              type="button"
              onClick={() => copyValue(CONTACT.wechat)}
              className="map-card flex min-w-0 items-center justify-between gap-4 text-left transition hover:border-gold/45"
            >
              <span className="flex min-w-0 items-center gap-3">
                <MessageCircle size={18} className="shrink-0 text-gold" />
                <span className="min-w-0">
                  <span className="caption-copy block">微信</span>
                  <span className="block break-all text-sm font-medium md:text-base">{CONTACT.wechat}</span>
                </span>
              </span>
              <Copy size={15} className="shrink-0 text-muted" />
            </button>

            <button
              type="button"
              onClick={() => copyValue(CONTACT.tara)}
              className="map-card flex min-w-0 items-center justify-between gap-4 text-left transition hover:border-gold/45"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Hash size={18} className="shrink-0 text-gold" />
                <span className="min-w-0">
                  <span className="caption-copy block">Tara</span>
                  <span className="block break-all text-sm font-medium md:text-base">{CONTACT.tara}</span>
                </span>
              </span>
              <Copy size={15} className="shrink-0 text-muted" />
            </button>
          </div>

          <a
            href="/resume.pdf"
            download
            className="mt-6 inline-flex items-center gap-2 border border-gold bg-gold px-5 py-3 text-sm font-semibold text-void transition hover:bg-text"
          >
            <Download size={17} />
            下载简历 PDF
          </a>
        </div>

        {/* 右侧：留言表单 */}
        <div className="relative min-w-0">
          <div className="map-card relative overflow-hidden">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="chapter-label mb-2">CoffeeChat</p>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                  留一句话给我
                </h3>
              </div>
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center border border-gold/25 bg-gold/10 font-[family-name:var(--font-display)] text-xl text-gold md:flex">
                ☕
              </div>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center border border-gold/35 bg-gold/10 text-2xl">
                  ✦
                </div>
                <p className="font-[family-name:var(--font-display)] text-xl text-text">
                  已收到，感谢你的留言。
                </p>
                <p className="caption-copy text-muted">如果你留了联系方式，我会尽快联系你。</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 border border-gold/30 px-4 py-2 text-sm text-gold transition hover:border-gold"
                >
                  再留一条
                </button>
              </div>
            ) : (
              <form onSubmit={submitMessage} className="space-y-4">
                <textarea
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  rows={4}
                  maxLength={300}
                  placeholder="写一句想和我说的话……也欢迎留下你的联系方式。"
                  className="min-h-28 w-full resize-none border border-gold/20 bg-void/70 p-4 text-base text-text outline-none transition placeholder:text-muted/70 focus:border-gold"
                />

                <div className="flex items-center justify-between gap-3">
                  <p className="caption-copy text-muted/60">{content.length}/300</p>
                  <button
                    type="submit"
                    disabled={!content.trim() || submitting}
                    className="inline-flex items-center gap-2 border border-gold bg-gold px-4 py-2 text-sm font-semibold text-void transition hover:bg-text disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-muted"
                  >
                    <Send size={15} />
                    {submitting ? '发送中…' : '发送'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 页脚祝福 */}
      <div className="mt-20 border-t border-gold/10 pt-8 text-center">
        <p className="font-[family-name:var(--font-display)] text-base text-text/55 md:text-lg">
          感谢在广阔的世界里与你相遇
        </p>
        <p className="mt-2 text-xs text-muted/40" style={{ letterSpacing: '0.2em' }}>
          DESIGNED BY ZIYAN ZHAO
        </p>
      </div>
    </Spread>
  );
}
