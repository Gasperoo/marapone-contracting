import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

function BlueprintOCR() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleImageUpload = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setText('');
    };

    const doOCR = async () => {
        if (!image) return;
        setLoading(true);
        setProgress(0);
        try {
            const { data: { text: recognizedText } } = await Tesseract.recognize(
                image,
                'eng',
                {
                    logger: (m) => {
                        if (m.status === 'recognizing text') {
                            setProgress(Math.round(m.progress * 100));
                        }
                    },
                }
            );
            setText(recognizedText);
        } catch (err) {
            console.error(err);
            setText('Error during OCR');
        }
        setLoading(false);
    };

    return (
        <div className="space-y-4">
            <div className="text-xs text-slate-400 mb-2">
                Upload a blueprint image to extract text, labels, dimensions, and quantities using in-browser OCR.
            </div>

            {/* Upload */}
            <label
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 text-sm font-semibold"
                style={{ background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.25)', color: '#FF6B00' }}
            >
                <span>{image ? 'Change Image' : 'Upload Blueprint Image'}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>

            {/* Preview */}
            {image && (
                <div className="rounded-xl overflow-hidden border border-white/5">
                    <img src={image} alt="Uploaded blueprint" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
                </div>
            )}

            {/* Extract button */}
            {image && (
                <button
                    onClick={doOCR}
                    disabled={loading}
                    className="w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
                    style={{
                        background: loading ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #FF6B00, #F59E0B)',
                        color: loading ? '#999' : '#fff',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                >
                    {loading ? `Extracting... ${progress}%` : 'Extract Text / Quantities'}
                </button>
            )}

            {/* Progress bar */}
            {loading && (
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #FF6B00, #F59E0B)' }}
                    />
                </div>
            )}

            {/* Results */}
            {text && (
                <div
                    className="rounded-xl p-4 text-xs font-mono leading-relaxed overflow-y-auto"
                    style={{
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        color: '#d1d5db',
                        maxHeight: '300px',
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2">Extracted Text</div>
                    {text}
                </div>
            )}
        </div>
    );
}

export default BlueprintOCR;
