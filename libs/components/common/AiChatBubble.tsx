import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

interface ChatMsg {
	role: 'user' | 'assistant';
	content: string;
}

const CHAT_API = 'http://localhost:3004/chat/message';

const SendIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
		<line x1="22" y1="2" x2="11" y2="13" />
		<polygon points="22 2 15 22 11 13 2 9 22 2" />
	</svg>
);

const CloseIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<line x1="18" y1="6" x2="6" y2="18" />
		<line x1="6" y1="6" x2="18" y2="18" />
	</svg>
);

const TrashIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<polyline points="3 6 5 6 21 6" />
		<path d="M19 6l-1 14H6L5 6" />
		<path d="M10 11v6M14 11v6" />
		<path d="M9 6V4h6v2" />
	</svg>
);

const AiChatBubble: React.FC = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState<ChatMsg[]>([]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (open && inputRef.current) inputRef.current.focus();
	}, [open]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages, loading]);

	const sendMessage = async () => {
		const text = input.trim();
		if (!text || loading) return;

		const userMsg: ChatMsg = { role: 'user', content: text };
		const updatedHistory = [...messages, userMsg];
		setMessages(updatedHistory);
		setInput('');
		if (inputRef.current) {
			inputRef.current.style.height = 'auto';
		}
		setLoading(true);

		try {
			const { data } = await axios.post(CHAT_API, {
				message: text,
				history: messages,
			});
			setMessages([...updatedHistory, { role: 'assistant', content: data.reply }]);
		} catch {
			setMessages([...updatedHistory, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
		} finally {
			setLoading(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<>
			{/* Floating trigger button */}
			<button className="ai-chat-bubble-btn" onClick={() => setOpen((v) => !v)} aria-label="Open AI assistant">
				<Image src="/general_images/chatbot.png" alt="AI Assistant" width={28} height={28} />
			</button>

			{/* Chat window */}
			<AnimatePresence>
				{open && (
					<motion.div
						className="ai-chat-window"
						initial={{ opacity: 0, scale: 0.88, y: 16 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.88, y: 16 }}
						transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
					>
						{/* Header */}
						<div className="ai-chat-header">
							<div className="ai-chat-header-left">
								<div className="ai-chat-avatar">
									<Image src="/general_images/chatbot.png" alt="AI Assistant" width={26} height={26} />
								</div>
								<div>
									<div className="ai-chat-title">Monolith Assistant</div>
									<div className="ai-chat-status">Always here to help</div>
								</div>
							</div>
							<div className="ai-chat-header-actions">
								{messages.length > 0 && (
									<button onClick={() => setMessages([])} aria-label="Clear chat" title="Clear chat">
										<TrashIcon />
									</button>
								)}
								<button onClick={() => setOpen(false)} aria-label="Close chat">
									<CloseIcon />
								</button>
							</div>
						</div>

						{/* Messages */}
						<div className="ai-chat-messages">
							{messages.length === 0 && !loading ? (
								<div className="ai-chat-welcome">
									<div className="ai-welcome-icon">
										<Image src="/general_images/chatbot.png" alt="AI Assistant" width={32} height={32} />
									</div>
									<p>Hi! I&apos;m your Monolith furniture assistant. Ask me about styles, rooms, materials, or get design advice.</p>
								</div>
							) : (
								<>
									{messages.map((msg, i) => (
										<div key={i} className={`ai-chat-msg ${msg.role}`}>
											<div className="ai-chat-bubble">
												{msg.role === 'assistant' ? (
													<ReactMarkdown
														components={{
															a: ({ href, children }) => (
																<a
																	href={href}
																	style={{ color: '#C46A4A', textDecoration: 'underline', cursor: 'pointer' }}
																	onClick={(e) => { e.preventDefault(); router.push(href || '/'); }}
																>
																	{children}
																</a>
															),
															strong: ({ children }) => (
																<strong style={{ color: '#1C1A17', fontWeight: 600 }}>{children}</strong>
															),
															p: ({ children }) => (
																<p style={{ margin: '4px 0' }}>{children}</p>
															),
															ul: ({ children }) => (
																<ul style={{ paddingLeft: '16px', margin: '4px 0' }}>{children}</ul>
															),
															li: ({ children }) => (
																<li style={{ margin: '2px 0' }}>{children}</li>
															),
														}}
													>
														{msg.content}
													</ReactMarkdown>
												) : (
													msg.content
												)}
											</div>
										</div>
									))}
									{loading && (
										<div className="ai-chat-msg assistant ai-chat-typing">
											<div className="ai-chat-bubble">
												<span />
												<span />
												<span />
											</div>
										</div>
									)}
								</>
							)}
							<div ref={messagesEndRef} />
						</div>

						{/* Input */}
						<div className="ai-chat-input-row">
							<textarea
								ref={inputRef}
								rows={1}
								placeholder="Ask about furniture, styles, rooms…"
								value={input}
								onChange={(e) => {
									setInput(e.target.value);
									e.target.style.height = 'auto';
									e.target.style.height = e.target.scrollHeight + 'px';
								}}
								onKeyDown={handleKeyDown}
								disabled={loading}
							/>
							<button className="ai-chat-send-btn" onClick={sendMessage} disabled={!input.trim() || loading} aria-label="Send message">
								<SendIcon />
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default AiChatBubble;
