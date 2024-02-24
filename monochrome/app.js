const ADD_TO_CART_EVENT = 'cart/productAdded';
const REMOVE_FROM_CART_EVENT = 'cart/productRemoved';
const ADD_TO_WISHLIST_EVENT = 'wl/productAdded';
const REMOVE_FROM_WISHLIST_EVENT = 'wl/productRemoved';

const AddToCartButton = ({ productId }) => {
  const state = React.useState({
    added: false,
    busy: false,
  });

  const actualState = state[0];
  const setState = state[1];
  const { added, busy } = actualState;

  const onClick = () => {
    setState({
      ...actualState,
      busy: true,
    });

    setTimeout(() => {
      const eventName =
        added === true ? REMOVE_FROM_CART_EVENT : ADD_TO_CART_EVENT;

      dispatchEvent(
        new CustomEvent(eventName, {
          detail: {
            productId,
          },
        }),
      );

      setState({
        ...actualState,
        added: !actualState.added,
      });
    }, Math.floor(Math.random() * 3000));
  };

  return (
    <>
      <button
        className={`product-control add-to-cart ${added ? 'active' : ''}`}
        type="button"
        title={added === true ? 'Remove from cart' : 'Add to cart'}
        onClick={onClick}
        disable={busy}
      >
        {busy === true ? (
          <i className="fas fa-spinner"></i>
        ) : added === true ? (
          <i class="fa-solid fa-minus"></i>
        ) : (
          <i class="fa-solid fa-plus"></i>
        )}
      </button>
    </>
  );
};

const AddToWishlistButton = ({ productId }) => {
  const [{ added, busy }, setState] = React.useState({
    added: false,
    busy: false,
  });
  const onClick = () => {
    setState({
      busy: true,
    });

    const eventName =
      added === true ? REMOVE_FROM_WISHLIST_EVENT : ADD_TO_WISHLIST_EVENT;

    dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          productId,
        },
      }),
    );

    setState({
      added: !added,
      busy: false,
    });
  };

  return (
    <>
      <button
        className={`product-control add-to-wishlist ${added ? 'active' : ''}`}
        type="button"
        title={added === true ? 'Remove from Wishlist' : 'Add to Wishlist'}
        onClick={onClick}
        disabled={busy}
      >
        {added === true ? (
          <i class="fa-solid fa-heart"></i>
        ) : (
          <i class="fa-regular fa-heart"></i>
        )}
      </button>
    </>
  );
};

const ProductControls = (props) => {
  const { productId } = props;

  return [
    <AddToWishlistButton
      productId={productId}
      key={1}
    ></AddToWishlistButton>,
    <AddToCartButton
      productId={productId}
      key={0}
    ></AddToCartButton>,
  ];
};

const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControl, index) => {
  const root = ReactDOM.createRoot(productTileControl);

  root.render(<ProductControls productId={index}></ProductControls>);
});

const HeaderCartCounter = () => {
  const state = React.useState({
    productIds: [],
    qty: 0,
  });
  const actualState = state[0];
  const setState = state[1];

  React.useEffect(() => {
    const handler = ({ detail }) => {
      const { productId } = detail;

      setState((previousState) => {
        return {
          productIds: [...previousState.productIds, productId],
          qty: previousState.qty + 1,
        };
      });
    };

    addEventListener(ADD_TO_CART_EVENT, handler);

    return () => {
      removeEventListener(ADD_TO_CART_EVENT, handler);
    };
  }, []);

  React.useEffect(() => {
    const handler = ({ detail }) => {
      setState((previousState) => {
        return {
          productIds: previousState.productIds.filter((productId) => {
            return productId !== detail.productId;
          }),
          qty: previousState.qty - 1,
        };
      });
    };

    addEventListener(REMOVE_FROM_CART_EVENT, handler);

    return () => {
      removeEventListener(REMOVE_FROM_CART_EVENT, handler);
    };
  }, []);

  const showProducts = () => {
    let message = '';
    if (actualState.qty <= 0) {
      message = 'There are no products in your cart.';
    } else {
      message = `These are the pids in your cart: ${actualState.productIds}`;
    }

    alert(message);
  };

  return (
    <div
      className="header-counter"
      onClick={showProducts}
    >
      <span className="cart-qty">{actualState.qty}</span>
      <i className="fas fa-shopping-cart icon"></i>
    </div>
  );
};

const HeaderWlCounter = () => {
  // nested destructure
  const [{ productIds, qty }, setState] = React.useState({
    productIds: [],
    qty: 0,
  });

  React.useEffect(() => {
    const handler = ({ detail }) => {
      const { productId } = detail;

      setState(({ productIds, qty }) => {
        return {
          productIds: [...productIds, productId],
          qty: ++qty,
        };
      });
    };
    addEventListener(ADD_TO_WISHLIST_EVENT, handler);

    return () => {
      removeEventListener(ADD_TO_WISHLIST_EVENT, handler);
    };
  }, []);

  React.useEffect(() => {
    const handler = ({ detail }) => {
      setState(({ productIds, qty }) => {
        return {
          productIds: productIds.filter((productId) => {
            return productId !== detail.productId;
          }),
          qty: --qty,
        };
      });
    };
    addEventListener(REMOVE_FROM_WISHLIST_EVENT, handler);

    return () => {
      removeEventListener(REMOVE_FROM_WISHLIST_EVENT, handler);
    };
  }, []);

  const showProducts = () => {
    const message =
      qty <= 0
        ? 'There are no product in your wishlist.'
        : `There are the pids in your wishlist: ${productIds}`;

    alert(message);
  };

  return (
    <li
      className="header-counter"
      onClick={showProducts}
    >
      <span className="cart-qty">{qty}</span>
      <i className="fas fa-heart icon"></i>
    </li>
  );
};

const HeaderCounters = () => {
  const [showButtons, setsShowButtons] = React.useState(true);
  const toggleCounters = () => {
    setsShowButtons(!showButtons);
  };

  return (
    <>
      <li>
        <a
          href="http://"
          title="My Account"
        >
          <i class="fas fa-user"></i>
        </a>
      </li>
      <li>
        <button
          title="Toggle"
          type="button"
          onClick={toggleCounters}
        >
          Toggle
        </button>
      </li>
      {showButtons ? (
        <>
          <HeaderCartCounter></HeaderCartCounter>
          <HeaderWlCounter></HeaderWlCounter>
        </>
      ) : null}
    </>
  );
};

const headerCounters = document.querySelector('.header-counters');
ReactDOM.createRoot(headerCounters).render(<HeaderCounters></HeaderCounters>);

// newsletter form
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

const NewsletterForm = () => {
  const [state, setState] = React.useState({
    email: '',
    formMessage: '',
    busy: false,
    successMessage: '',
  });
  const { email, formMessage, busy, successMessage } = state;
  const onChange = (event) => {
    setState({
      ...state,
      email: event.target.value,
      formMessage: '',
    });
  };

  const send = (event) => {
    event.preventDefault();

    if (busy) {
      return;
    }

    if (!validateEmail(email)) {
      setState({
        ...state,
        formMessage: 'Please use a valid email',
      });

      return;
    }

    setState({
      ...state,
      busy: true,
      formMessage: '',
    });

    setTimeout(() => {
      setState({
        ...state,
        busy: false,
        email: '',
        successMessage: `Emailul ${email} a fost inscris.`,
      });

      setTimeout(() => {
        setState({
          ...state,
          email: '',
          successMessage: '',
        });
      }, 1200);
    }, 1200);
  };

  if (successMessage.length > 0) {
    return <div className="container">{successMessage}</div>;
  }

  return (
    <form
      className="form-newsletter"
      onSubmit={send}
    >
      <label htmlFor="field-newsletter">sign up for our newsletter</label>

      <input
        type="text"
        name="field-newsletter"
        id="field-newsletter"
        placeholder="email"
        value={email}
        onChange={onChange}
      ></input>

      <button
        title="Subscribe"
        type="submit"
        disabled={busy}
      >
        {busy ? '...loading' : 'Subscribe'}
      </button>

      <div className="form-message">{formMessage}</div>
    </form>
  );
};

ReactDOM.createRoot(
  document.querySelector('section.footer-sign-up-newsletter'),
).render(<NewsletterForm></NewsletterForm>);
